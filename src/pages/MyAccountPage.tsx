"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Package, CreditCard, LogOut } from "lucide-react"

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "Andrew Smith",
    email: "andrewsmith@quest.ai",
    phone: "+94 123 456 789",
    address: "123 Main St, Colombo, Sri Lanka",
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <button
                className={`flex items-center gap-2 w-full p-2 rounded text-left ${
                  activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                <span>Profile</span>
              </button>

              <button
                className={`flex items-center gap-2 w-full p-2 rounded text-left ${
                  activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <Package size={18} />
                <span>Orders</span>
              </button>

              <button
                className={`flex items-center gap-2 w-full p-2 rounded text-left ${
                  activeTab === "payment" ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard size={18} />
                <span>Payment Methods</span>
              </button>

              <Link to="/login" className="flex items-center gap-2 w-full p-2 rounded text-left hover:bg-gray-200">
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Profile Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <div className="font-medium">{user.name}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <div className="font-medium">{user.email}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <div className="font-medium">{user.phone}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Address</label>
                  <div className="font-medium">{user.address}</div>
                </div>

                <div className="pt-4">
                  <button className="bg-black text-white px-4 py-2 rounded">Edit Profile</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Your Orders</h2>
              <Link to="/orders" className="text-blue-600 hover:underline">
                View all orders
              </Link>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
              <p>You have no saved payment methods.</p>
              <button className="bg-black text-white px-4 py-2 rounded mt-4">Add Payment Method</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyAccountPage

