"use client"

import type React from "react"

import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribed with email:", email)
    // Implement newsletter subscription
    setEmail("")
  }

  return (
    <section className="py-12 md:py-16 bg-light border-t border-gray-200">
      <div className="container text-center">
        <h2 className="text-2xl font-bold mb-6">D G C S Holdings (Pvt) Ltd.</h2>
        <p className="text-muted">
              "Delivering Solutions Beyond Boundaries"
            </p>
        {/* <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-r-md font-medium">
            SUBSCRIBE
          </button>
        </form> */}
      </div>
    </section>
  )
}

export default Newsletter

