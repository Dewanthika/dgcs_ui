"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    customerType: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    street: "",
    contact: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration data:", formData)
    // Implement registration functionality
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Logo</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Type */}
            <div className="space-y-2">
              <label htmlFor="customerType" className="block text-sm text-gray-600">
                Customer Type
              </label>
              <div className="relative">
                <select
                  id="customerType"
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 pr-8 appearance-none focus:outline-none focus:border-black bg-transparent"
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Last Name"
                required
              />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="postalCode" className="block text-sm text-gray-600">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="street" className="block text-sm text-gray-600">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label htmlFor="contact" className="block text-sm text-gray-600">
                Contact
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Contact"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Date"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-black text-white py-3 font-medium uppercase">
                REGISTER
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-black font-medium hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-300">
        <div className="h-full flex items-center justify-center">
          <img src="/placeholder.svg?height=400&width=400" alt="Register" className="max-w-md" />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

