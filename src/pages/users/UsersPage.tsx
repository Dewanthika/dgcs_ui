"use client"

import { useState, useEffect } from "react"
import type { User } from "../../types"
import { UserPlus, Filter } from "lucide-react"
import StatusBadge from "../../components/ui/StatusBadge"
import SearchBar from "../../components/ui/SearchBar"
import ActionButtons from "../../components/ui/ActionButtons"
import PageHeader from "../../components/ui/PageHeader"
import DataTable from "../../components/tables/DataTable"
import Modal from "../../components/ui/Modal"
import UserForm from "../../features/users/UserForm"

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    // Generate mock users with the new user roles
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
        email: "staff@example.com",
        fname: "Staff",
        lname: "Member",
        dob: "1988-03-15",
        address: "456 Staff Ave, Kandy",
        phone: "+94 234 567 890",
        joinedDate: "2023-02-15",
        customerID: "",
        password: "********",
        userRole: "staff",
        status: "active",
      },
      {
        id: 3,
        userID: "USR003",
        userTypeID: 3,
        email: "john@example.com",
        fname: "John",
        lname: "Doe",
        dob: "1985-05-15",
        address: "789 Customer Ave, Kandy",
        phone: "+94 345 678 901",
        joinedDate: "2023-03-10",
        customerID: "CUST001",
        password: "********",
        userRole: "individual",
        status: "active",
      },
      {
        id: 4,
        userID: "USR004",
        userTypeID: 4,
        email: "jane@example.com",
        fname: "Jane",
        lname: "Smith",
        dob: "1992-08-22",
        address: "101 User Blvd, Galle",
        phone: "+94 456 789 012",
        joinedDate: "2023-04-05",
        customerID: "CUST002",
        password: "********",
        userRole: "individual",
        status: "inactive",
      },
      {
        id: 5,
        userID: "USR005",
        userTypeID: 5,
        email: "acme@example.com",
        fname: "Acme",
        lname: "Representative",
        dob: "1980-12-10",
        address: "202 Company St, Negombo",
        phone: "+94 567 890 123",
        joinedDate: "2023-05-20",
        customerID: "COMP001",
        password: "********",
        userRole: "company",
        status: "active",
        companyName: "Acme Corporation",
        businessRegNo: "REG12345",
        contactPerson: "John Manager",
      },
      {
        id: 6,
        userID: "USR006",
        userTypeID: 6,
        email: "global@example.com",
        fname: "Global",
        lname: "Representative",
        dob: "1985-07-25",
        address: "303 Enterprise St, Matara",
        phone: "+94 678 901 234",
        joinedDate: "2023-06-15",
        customerID: "COMP002",
        password: "********",
        userRole: "company",
        status: "pending",
        companyName: "Global Enterprises",
        businessRegNo: "REG67890",
        contactPerson: "Sarah Director",
      },
    ]

    setUsers(mockUsers)
  }, [])

  const handleAddUser = (userData: Omit<User, "id">) => {
    if (currentUser) {
      // Update existing user
      setUsers(users.map((user) => (user.id === currentUser.id ? { ...userData, id: currentUser.id } : user)))
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: users.length + 1,
        userID: `USR${String(users.length + 1).padStart(3, "0")}`,
        joinedDate: new Date().toISOString().split("T")[0],
        customerID:
          userData.userRole === "individual" || userData.userRole === "company"
            ? `${userData.userRole === "company" ? "COMP" : "CUST"}${String(users.length + 1).padStart(3, "0")}`
            : "",
      }
      setUsers([...users, newUser])
    }

    setShowAddUserModal(false)
    setCurrentUser(undefined)
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
    setCurrentUser(user)
    setShowAddUserModal(true)
  }

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companyName && user.companyName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesRole = roleFilter === "all" || user.userRole === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Get counts for each role
  const roleCounts = {
    admin: users.filter((user) => user.userRole === "admin").length,
    staff: users.filter((user) => user.userRole === "staff").length,
    individual: users.filter((user) => user.userRole === "individual").length,
    company: users.filter((user) => user.userRole === "company").length,
  }

  // Format user role for display
  const formatUserRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin"
      case "staff":
        return "Staff"
      case "individual":
        return "Individual Customer"
      case "company":
        return "Company Customer"
      default:
        return role.charAt(0).toUpperCase() + role.slice(1)
    }
  }

  const columns = [
    { header: "User ID", accessor: "userID" },
    {
      header: "Name",
      accessor: (user: User) => {
        if (user.userRole === "company") {
          return (
            <div>
              <div>{user.companyName}</div>
              <div className="text-xs text-gray-500">{user.contactPerson}</div>
            </div>
          )
        }
        return `${user.fname} ${user.lname}`
      },
    },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Role",
      accessor: (user: User) => <StatusBadge status={formatUserRole(user.userRole)} type="general" />,
    },
    {
      header: "Status",
      accessor: (user: User) => <StatusBadge status={user.status} type="user" />,
    },
    { header: "Joined Date", accessor: "joinedDate" },
    {
      header: "Actions",
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <ActionButtons onEdit={() => handleEditUser(user)} onDelete={() => handleDeleteUser(user.id)} />
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
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="User Management"
        action={
          <button
            onClick={() => {
              setCurrentUser(undefined)
              setShowAddUserModal(true)
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <UserPlus className="w-5 h-5 mr-1" />
            Add User
          </button>
        }
      />

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
          <p className="text-sm text-gray-500">Staff</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.staff}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Individual Customers</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.individual}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Company Customers</p>
          <p className="text-2xl font-bold mt-1">{roleCounts.company}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." />

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
                <option value="staff">Staff</option>
                <option value="individual">Individual Customer</option>
                <option value="company">Company Customer</option>
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

        <DataTable
          columns={columns}
          data={filteredUsers}
          keyExtractor={(user) => user.id}
          emptyMessage={
            searchTerm || roleFilter !== "all" || statusFilter !== "all"
              ? "No users found. Try changing your filters."
              : "No users found. Add some users to get started."
          }
        />
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => {
          setShowAddUserModal(false)
          setCurrentUser(undefined)
        }}
        title={currentUser ? "Edit User" : "Add User"}
        maxWidth="lg"
      >
        <UserForm
          initialData={currentUser}
          onSubmit={handleAddUser}
          onCancel={() => {
            setShowAddUserModal(false)
            setCurrentUser(undefined)
          }}
        />
      </Modal>
    </>
  )
}

export default UsersPage

