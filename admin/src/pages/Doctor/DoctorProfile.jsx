import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if(dToken){
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: { dToken }
      })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-blue-400 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt=""/>
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* Doc Info name degree and experience */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* Doctor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>{currency}
            {isEdit ? 
              <input 
                type="number" 
                onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} 
                value={profileData.fees}
                className='border border-gray-300 rounded px-2 py-1 ml-1'
              /> 
              : profileData.fees}
            </span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <div className='text-sm'>
              {isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input 
                    type="text" 
                    placeholder="Address Line 1"
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      address: {...prev.address, line1: e.target.value}
                    }))} 
                    value={profileData.address.line1}
                    className='border border-gray-300 rounded px-2 py-1 w-full'
                  />
                  <input 
                    type="text" 
                    placeholder="Address Line 2"
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      address: {...prev.address, line2: e.target.value}
                    }))} 
                    value={profileData.address.line2}
                    className='border border-gray-300 rounded px-2 py-1 w-full'
                  />
                </div>
              ) : (
                <p>
                  {profileData.address.line1}
                  <br/>
                  {profileData.address.line2}
                </p>
              )}
            </div>
          </div>

          <div className='flex gap-1 pt-2'>
            <input 
              checked={profileData.available} 
              onChange={(e) => setProfileData(prev => ({...prev, available: e.target.checked}))}
              type="checkbox" 
              disabled={!isEdit}
            />
            <label>Available</label>
          </div>

          {isEdit ? (
            <div className='flex gap-2 mt-5'>
              <button 
                onClick={updateProfile}
                className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-blue-400 hover:text-white transition-all'
              >
                Save
              </button>
              <button 
                onClick={() => {
                  setIsEdit(false)
                  getProfileData() // Reset to original data
                }}
                className='px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-400 hover:text-white transition-all'
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEdit(true)} 
              className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-blue-400 hover:text-white transition-all'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile