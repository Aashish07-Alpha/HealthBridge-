import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500 rounded-lg px-6 py-8 md:px-10 lg:px-20 gap-8">
      {/* Left side - Content */}
      <div className="flex-1 text-white space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        
        <div className="flex items-center gap-4">
          <img 
            src={assets.group_profiles} 
            alt="Trusted profiles" 
            className="w-16 h-16 object-contain"
          />
          <p className="text-sm md:text-base">
            Simply browse through our extensive list of trusted doctors,<br /> 
            schedule your appointment hassle-free.
          </p>
        </div>

        <a 
          href="#speciality" 
          className="inline-flex items-center gap-2 bg-white text-blue-500 px-6 py-3 rounded-full font-medium hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 transform"
        >
          Book appointment 
          <img 
            src={assets.arrow_icon} 
            alt="Arrow icon" 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img 
          src={assets.header_img} 
          alt="Doctor illustration" 
          className="max-w-full h-auto md:max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  )
}

export default Header