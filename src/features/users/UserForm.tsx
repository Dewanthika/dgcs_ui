"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { User } from "../../types"
import FormField from "../../components/ui/FormField"

interface UserFormProps {
  initialData?: User
  onSubmit: (data: Omit<User, "id">) => void
  onCancel: () => void
}

const UserForm = ({ initialData, onSubmit, onCancel }: UserFormProps) => {
  const isEditing = !!initialData

  const [formData, setFormData] = useState<Omit<User, "id">>({
    userID: initialData?.userID || "",
    userTypeID: initialData?.userTypeID || 1,
    email: initialData?.email || "",
    fname: initialData?.fname || "",
    lname: initialData?.lname || "",
    dob: initialData?.dob || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    joinedDate: initialData?.joinedDate || new Date().toISOString().split("T")[0],
    customerID: initialData?.customerID || "",
    password: initialData?.password || "",
    userRole: initialData?.userRole || "individual",
    status: initialData?.status || "active",
    companyName: initialData?.companyName || "",
    businessRegNo: initialData?.businessRegNo || "",
    contactPerson: initialData?.contactPerson || "",
  })

  const [activeTab, setActiveTab] = useState<string>("basic")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Set password confirm value when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setPasswordConfirm(initialData.password)
    }
  }, [isEditing, initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear password error when either password field changes
    if (name === "password") {
      setPasswordError("")
    }
  }

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
    setPasswordError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match if not editing or if password was changed
    if (!isEditing && formData.password !== passwordConfirm) {
      setPasswordError("Passwords do not match")
      return
    }

    // Additional validation for company customers
    if (formData.userRole === "company" && (!formData.companyName || !formData.businessRegNo)) {
      alert("Please fill in all required company information")
      setActiveTab("company")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          type="button"
          className={`px-4 py-2 font-medium ${
            activeTab === "basic" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Information
        </button>
        <button
          type="button"
          className={`px-4 py-2 font-medium ${
            activeTab === "account" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account Details
        </button>
        {formData.userRole === "company" && (
          <button
            type="button"
            className={`px-4 py-2 font-medium ${
              activeTab === "company" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("company")}
          >
            Company Information
          </button>
        )}
      </div>

      {/* Basic Information Tab */}
      {activeTab === "basic" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="First Name" id="fname" required>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>

            <FormField label="Last Name" id="lname" required>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
          </div>

          <FormField label="Email" id="email" required>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Phone" id="phone" required>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Date of Birth" id="dob" required>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Address" id="address" required>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>
        </div>
      )}

      {/* Account Details Tab */}
      {activeTab === "account" && (
        <div className="space-y-4">
          <FormField label="User Role" id="userRole" required>
            <select
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="individual">Individual Customer</option>
              <option value="company">Company Customer</option>
            </select>
          </FormField>

          <FormField label="Status" id="status" required>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </FormField>

          {!isEditing ? (
            <>
              <FormField label="Password" id="password" required error={passwordError}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                />
              </FormField>

              <FormField label="Confirm Password" id="passwordConfirm" required error={passwordError}>
                <input
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  className={`w-full p-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                />
              </FormField>
            </>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <p className="text-yellow-700 text-sm">
                Password fields are not shown when editing a user. To change a user's password, please use the reset
                password function.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Company Information Tab */}
      {activeTab === "company" && formData.userRole === "company" && (
        <div className="space-y-4">
          <FormField label="Company Name" id="companyName" required>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Business Registration Number" id="businessRegNo" required>
            <input
              type="text"
              id="businessRegNo"
              name="businessRegNo"
              value={formData.businessRegNo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Contact Person" id="contactPerson">
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </FormField>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-between pt-4 border-t">
        <div>
          {activeTab === "basic" && formData.userRole === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next: Company Information
            </button>
          )}
          {activeTab === "account" && formData.userRole === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next: Company Information
            </button>
          )}
          {activeTab === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back to Basic Information
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default UserForm

