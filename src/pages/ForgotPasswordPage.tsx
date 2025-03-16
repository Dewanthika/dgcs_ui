"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset requested for:", email)
    // Implement password reset functionality
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Logo</h1>
          </div>

          <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
          <p className="mb-6 text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Email"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-black text-white py-3 font-medium uppercase">
                RESET PASSWORD
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="text-gray-500 text-sm hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-300">
        <div className="h-full flex items-center justify-center">
          <img src="/placeholder.svg?height=400&width=400" alt="Forgot Password" className="max-w-md" />
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

