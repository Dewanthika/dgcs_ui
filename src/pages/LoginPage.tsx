"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", { username, password })
    // Implement login functionality
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Logo</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm text-gray-600">
                User Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Password"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-black text-white py-3 font-medium uppercase">
                LOG IN
              </button>
            </div>

            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-gray-500 text-sm hover:underline block">
                Forgot Password
              </Link>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-black font-medium hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-300">
        <div className="h-full flex items-center justify-center">
          <img src="/placeholder.svg?height=400&width=400" alt="Login" className="max-w-md" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage

