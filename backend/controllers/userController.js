import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Fetch userId from req.user set by middleware

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is missing." });
    }

    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// API to update user profile
// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Get userId from req.user (set by middleware)
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // Assuming file uploaded via Multer

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update user profile data
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });

    // Handle image upload if present
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Add validation for required fields
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({
        success: false,
        message: "Missing required fields: userId, docId, slotDate, slotTime"
      });
    }

    const docData = await doctorModel.findById(docId).select('-password');

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // Fixed: Get user data excluding password (not selecting only password)
    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Convert docData to plain object and remove slots_booked
    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docDataObj,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in doc data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api  to get appointments 
const listAppointment = async (req, res) => {
  try {
    // Get userId from req.user (set by authUser middleware)
    const { userId } = req.user;

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//API for cancel appointment

//API for cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    // Get userId from req.user (set by authUser middleware)
    const { userId } = req.user;
    // Get appointmentId from req.body
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Releasing doctor slotDate
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Fixed: Return success message instead of error.message
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// API to make payment of appointments using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found"
      });
    }

    // Check if payment is already done
    if (appointmentData.payment) {
      return res.json({
        success: false,
        message: "Payment already completed"
      });
    }

    // Creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100, // amount in smallest currency unit (paise)
      currency: process.env.CURRENCY || 'INR',
      receipt: appointmentId,
      notes: {
        appointmentId: appointmentId,
        userId: appointmentData.userId
      }
    };

    // Creation of an order
    const order = await razorpayInstance.orders.create(options);
    
    console.log('Razorpay order created:', order);

    res.json({ success: true, order });

  } catch (error) {
    console.error('Razorpay payment error:', error);
    res.json({
      success: false,
      message: error.message || 'Payment initialization failed'
    });
  }
};

// API to verify razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Get order details to find appointment ID
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
      
      // Fetch payment details to ensure payment is captured
      const paymentInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);
      
      console.log('Payment Info:', paymentInfo);
      
      if (paymentInfo.status === 'captured') {
        // Update appointment payment status
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
          orderInfo.receipt, // This is the appointmentId
          {
            payment: true,
            paymentId: razorpay_payment_id
          },
          { new: true } // Return updated document
        );

        console.log('Updated appointment:', updatedAppointment);

        res.json({ 
          success: true, 
          message: "Payment verified and appointment updated successfully" 
        });
      } else {
        res.json({ 
          success: false, 
          message: "Payment not captured yet" 
        });
      }
    } else {
      res.json({ 
        success: false, 
        message: "Payment verification failed - Invalid signature" 
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.json({ 
      success: false, 
      message: error.message || 'Payment verification failed' 
    });
  }
};
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentRazorpay,verifyRazorpay };
