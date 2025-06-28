import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  // Function to cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', 
        { appointmentId }, 
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to verify payment after successful Razorpay payment
  const verifyPayment = async (razorpayResponse) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', 
        razorpayResponse, 
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Payment successful!");
        getUserAppointments(); // Refresh appointments to show updated status
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment verification failed");
    }
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initPay = async (order) => {
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway");
      return;
    }

    // Check if Razorpay key is available
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      toast.error("Payment configuration error");
      console.error("VITE_RAZORPAY_KEY_ID not found in environment variables");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Doctor Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log('Payment successful:', response);
        try {
          // Verify payment on backend
          await verifyPayment(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          toast.info("Payment cancelled");
        }
      },
      theme: {
        color: '#3399cc'
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast.error("Payment gateway initialization failed");
    }
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      console.log('Initiating payment for appointment:', appointmentId);
      
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', 
        { appointmentId }, 
        { headers: { token } }
      );
      
      console.log('Payment response:', data);
      
      if (data.success) {
        await initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error("Failed to initiate payment");
    }
  }
  
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">No appointments found</p>
        ) : (
          appointments.map((item, index) => {
            return (
              <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
                <div>
                  <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs mt-1">{item.docData.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">Date & Time: </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">Amount: </span>
                    ${item.amount}
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  {/* Show Pay Online button only if not cancelled, not completed, and payment not done */}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button 
                      onClick={() => appointmentRazorpay(item._id)} 
                      className="text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                  )}
                  
                  {/* Show Paid status if payment is completed */}
                  {item.payment && !item.cancelled && !item.isCompleted && (
                    <p className="text-green-500 text-sm font-medium bg-green-50 px-3 py-2 rounded text-center">
                      ✓ Paid
                    </p>
                  )}
                  
                  {/* Show Cancel button - available unless cancelled or completed */}
                  {!item.cancelled && !item.isCompleted && (
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  )}
                  
                  {/* Show cancelled status */}
                  {item.cancelled && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded text-center">
                      ✗ Cancelled
                    </p>
                  )}
                  
                  {/* Show completed status */}
                  {item.isCompleted && (
                    <p className="text-green-500 text-sm font-medium bg-green-50 px-3 py-2 rounded text-center">
                      ✓ Completed
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;