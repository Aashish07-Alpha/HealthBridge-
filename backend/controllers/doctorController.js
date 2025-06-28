import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });

    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        res.json({ success: true, doctors })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });

    }
}

//Api for login Doctor

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {  // Changed: Login when passwords DO match
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {  // Changed: Reject when passwords DON'T match
            res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

//Api to get doctor appointments for doctor

const appointmentsDoctor = async (req, res) => {
    try {
        // Get docId from authenticated doctor (set by authDoctor middleware)
        const docId = req.user.docId;

        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//Api to mark appointment completed

const appointmentComplete = async (req, res) => {
    try {
        const { docId } = req.user
        const { appointmentId } = req.body  // or req.params depending on your route setup
        
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment completed" })
        } else {
            return res.json({ success: false, message: "Mark failed" })
        }
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId } = req.user
        const { appointmentId } = req.body  // or req.params depending on your route setup
        
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment cancelled" })
        } else {
            return res.json({ success: false, message: "Cancel failed" })
        }
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//Api to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.user

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0
        appointments.forEach((item) => {  // Changed from map to forEach
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.forEach((item) => {  // Changed from map to forEach
            if (!patients.includes(item.userId)) {  // Fixed logic: should be !includes
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//Ap to get doctor profile for doctor panel
const doctorProfile = async (req,res) =>{
    try {
        const {docId}=req.user
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success:true,profileData})
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
        
    }
}

//Api to update data of profile

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.user
        const { fees, address, available } = req.body

        const updateData = {}
        if (fees) updateData.fees = fees
        if (address) updateData.address = address  
        if (available !== undefined) updateData.available = available

        await doctorModel.findByIdAndUpdate(docId, updateData)
        
        res.json({success: true, message: 'Profile Updated'})
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,updateDoctorProfile,doctorProfile }