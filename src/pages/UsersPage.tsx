"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Edit, Trash2, UserPlus, Search, Filter } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "customer" | "vendor" | "shipping"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  // Update the newUser state to match the fields in the UI
  const [newUser, setNewUser] = useState({
    customerType: "Individual Customer",
    name: "",
    dateOfBirth: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    role: "customer" as const,
  })

  useEffect(() => {
    // Generate mock users
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        status: "active",
        lastLogin: "2023-07-15 09:23:45",
        createdAt: "2023-01-01",
      },
      {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        role: "customer",
        status: "active",
        lastLogin: "2023-07-14 14:30:22",
        createdAt: "2023-02-15",
      },
      {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "customer",
        status: "inactive",
        lastLogin: "2023-06-30 11:45:10",
        createdAt: "2023-03-10",
      },
      {
        id: 4,
        name: "Vendor Company",
        email: "vendor@example.com",
        role: "vendor",
        status: "active",
        lastLogin: "2023-07-15 08:12:33",
        createdAt: "2023-04-05",
      },
      {
        id: 5,
        name: "Shipping Partner",
        email: "shipping@example.com",
        role: "shipping",
        status: "active",
        lastLogin: "2023-07-14 16:50:18",
        createdAt: "2023-05-20",
      },
      {
        id: 6,
        name: "New Customer",
        email: "newcustomer@example.com",
        role: "customer",
        status: "pending",
        lastLogin: "Never",
        createdAt: "2023-07-14",
      },
    ]

    setUsers(mockUsers)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update the handleAddUser function to work with the new fields
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    const newUserObj: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUserObj])
    setShowAddUserModal(false)
    setNewUser({
      customerType: "Individual Customer",
      name: "",
      dateOfBirth: "",
      contact: "",
      email: "",
      address: "",
      city: "",
      district: "",
      postalCode: "",
      role: "customer",
    })
  }

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          const newStatus = user.status === "active" ? "inactive" : "active"
          return { ...user, status: newStatus }
        }
        return user
      }),
    )
  }

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Get counts for each role
  const roleCounts = {
    admin: users.filter((user) => user.role === "admin").length,
    customer: users.filter((user) => user.role === "customer").length,
    vendor: users.filter((user) => user.role === "vendor").length,
    shipping: users.filter((user) => user.role === "shipping").length,
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <UserPlus className="w-5 h-5 mr-1" />
          Add User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold mt-1">{users.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.admin}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.customer}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Vendors</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.vendor}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Shipping</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.shipping}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 p-2 border border-gray-300 rounded-md appearance-none pr-8"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="shipping">Shipping</option>
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "customer"
                              ? "bg-blue-100 text-blue-800"
                              : user.role === "vendor"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-sm">{user.createdAt}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Edit">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className={`px-2 py-1 rounded text-xs ${
                            user.status === "active"
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No users found.{" "}
                    {searchTerm || roleFilter !== "all" || statusFilter !== "all" ? "Try changing your filters." : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add User</h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="customerType" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Type
                </label>
                <select
                  id="customerType"
                  name="customerType"
                  value={newUser.customerType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Individual Customer">Individual Customer</option>
                  <option value="Business Customer">Business Customer</option>
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={newUser.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={newUser.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newUser.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={newUser.district}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={newUser.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="hidden">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                  <option value="shipping">Shipping</option>
                </select>
              </div>

              <div className="mt-6 flex justify-center">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UsersPage

