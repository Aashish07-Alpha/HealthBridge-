import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: { dtoken: dToken } // Changed from dToken to dtoken
            });

            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch appointments");
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch appointments");

        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch appointments");

        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {
                headers: { dToken }  // Fixed: was 'heades' now 'headers'
            })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
        }
    }

    const getProfileData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+ '/api/doctor/profile',{headers:{dToken}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
            
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments, cancelAppointment, completeAppointment,
        dashData, setDashData, getDashData,profileData,setProfileData,getProfileData


    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider