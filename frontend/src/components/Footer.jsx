import React from 'react'
import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Company Logo"/>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            HealthBridge is your trusted partner in managing healthcare needs with ease and efficiency. Our platform simplifies scheduling doctor appointments and maintaining health records while integrating cutting-edge technology to enhance user experience. Committed to bridging the gap between patients and healthcare providers, our vision is to create a seamless healthcare journey, ensuring everyone can access the care they need, when they need it.
          </p>
        </div>

        {/* center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">About us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">9423696844</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">ashishsurya2005@gmail.com</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-10">
        <hr className="border-gray-200"/>
        <p className="py-5 text-sm text-center text-gray-500">
          Copyright © 2024 HealthBridge - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer