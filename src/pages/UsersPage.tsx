import type React from "react"

import { useState, useEffect } from "react"
import { Edit, Trash2, UserPlus, Search, Filter } from "lucide-react"

interface User {
  id: number
  userID: string
  userTypeID: number
  email: string
  fname: string
  lname: string
  dob: string
  address: string
  phone: string
  joinedDate: string
  customerID: string
  password: string
  userRole: "admin" | "customer" | "vendor" | "shipping"
  status: "active" | "inactive" | "pending"
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    userID: "",
    userTypeID: 1,
    email: "",
    fname: "",
    lname: "",
    dob: "",
    address: "",
    phone: "",
    joinedDate: new Date().toISOString().split("T")[0],
    customerID: "",
    password: "",
    userRole: "customer",
    status: "active",
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Generate mock users
    const mockUsers: User[] = [
      {
        id: 1,
        userID: "USR001",
        userTypeID: 1,
        email: "admin@example.com",
        fname: "Admin",
        lname: "User",
        dob: "1990-01-01",
        address: "123 Admin St, Colombo",
        phone: "+94 123 456 789",
        joinedDate: "2023-01-01",
        customerID: "",
        password: "********",
        userRole: "admin",
        status: "active",
      },
      {
        id: 2,
        userID: "USR002",
        userTypeID: 2,
        email: "john@example.com",
        fname: "John",
        lname: "Doe",
        dob: "1985-05-15",
        address: "456 Customer Ave, Kandy",
        phone: "+94 234 567 890",
        joinedDate: "2023-02-15",
        customerID: "CUST001",
        password: "********",
        userRole: "customer",
        status: "active",
      },
      {
        id: 3,
        userID: "USR003",
        userTypeID: 2,
        email: "jane@example.com",
        fname: "Jane",
        lname: "Smith",
        dob: "1992-08-22",
        address: "789 User Blvd, Galle",
        phone: "+94 345 678 901",
        joinedDate: "2023-03-10",
        customerID: "CUST002",
        password: "********",
        userRole: "customer",
        status: "inactive",
      },
      {
        id: 4,
        userID: "USR004",
        userTypeID: 3,
        email: "vendor@example.com",
        fname: "Vendor",
        lname: "Company",
        dob: "1980-12-10",
        address: "101 Vendor St, Jaffna",
        phone: "+94 456 789 012",
        joinedDate: "2023-04-05",
        customerID: "",
        password: "********",
        userRole: "vendor",
        status: "active",
      },
      {
        id: 5,
        userID: "USR005",
        userTypeID: 4,
        email: "shipping@example.com",
        fname: "Shipping",
        lname: "Partner",
        dob: "1988-07-30",
        address: "202 Shipping Rd, Negombo",
        phone: "+94 567 890 123",
        joinedDate: "2023-05-20",
        customerID: "",
        password: "********",
        userRole: "shipping",
        status: "active",
      },
      {
        id: 6,
        userID: "USR006",
        userTypeID: 2,
        email: "newcustomer@example.com",
        fname: "New",
        lname: "Customer",
        dob: "1995-03-15",
        address: "303 New User St, Matara",
        phone: "+94 678 901 234",
        joinedDate: "2023-07-14",
        customerID: "CUST003",
        password: "********",
        userRole: "customer",
        status: "pending",
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

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing user
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)))
      setIsEditing(false)
    } else {
      // Add new user
      const newUserObj: User = {
        ...newUser,
        id: users.length + 1,
        userID: `USR${String(users.length + 1).padStart(3, "0")}`,
        joinedDate: new Date().toISOString().split("T")[0],
        customerID: newUser.userRole === "customer" ? `CUST${String(users.length + 1).padStart(3, "0")}` : "",
        status: "active",
      }

      setUsers([...users, newUserObj])
    }

    setShowAddUserModal(false)
    setNewUser({
      id: 0,
      userID: "",
      userTypeID: 1,
      email: "",
      fname: "",
      lname: "",
      dob: "",
      address: "",
      phone: "",
      joinedDate: new Date().toISOString().split("T")[0],
      customerID: "",
      password: "",
      userRole: "customer",
      status: "active",
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

  const handleEditUser = (user: User) => {
    setNewUser(user)
    setIsEditing(true)
    setShowAddUserModal(true)
  }

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userID.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.userRole === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Get counts for each role
  const roleCounts = {
    admin: users.filter((user) => user.userRole === "admin").length,
    customer: users.filter((user) => user.userRole === "customer").length,
    vendor: users.filter((user) => user.userRole === "vendor").length,
    shipping: users.filter((user) => user.userRole === "shipping").length,
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{user.userID}</td>
                    <td className="px-4 py-3 text-sm">{`${user.fname} ${user.lname}`}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">{user.phone}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.userRole === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.userRole === "customer"
                              ? "bg-blue-100 text-blue-800"
                              : user.userRole === "vendor"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)}
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
                    <td className="px-4 py-3 text-sm">{user.joinedDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                          onClick={() => handleEditUser(user)}
                        >
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
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit User" : "Add User"}</h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={newUser.fname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={newUser.lname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={newUser.dob}
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
                <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">
                  User Role
                </label>
                <select
                  id="userRole"
                  name="userRole"
                  value={newUser.userRole}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                  <option value="shipping">Shipping</option>
                </select>
              </div>

              {!isEditing && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required={!isEditing}
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {isEditing ? "Update User" : "Add User"}
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

