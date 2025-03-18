import { useState } from "react"
import { ChevronDown } from "lucide-react"

const AdminDashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("November 2021")

  // Mock data for the dashboard
  const stats = {
    totalOrders: 97235,
    totalCustomers: 600,
    totalRevenue: 123300,
    newCustomers: 34,
  }

  const orders = [
    { id: 1234, customer: "Customer", type: "Type", status: "Status" },
    { id: 1234, customer: "Customer", type: "Type", status: "Status" },
    { id: 1234, customer: "Customer", type: "Type", status: "Status" },
  ]

  const inventory = [
    { id: 1234, name: "Product", price: 200, stock: 23 },
    { id: 1234, name: "Product", price: 200, stock: 2 },
    { id: 1234, name: "Product", price: 200, stock: 23 },
  ]

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-orange-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Orders</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">{stats.totalOrders.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-green-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Customers</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">{stats.totalCustomers.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-indigo-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Revenue</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">LKR {stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">New Customer</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">{stats.newCustomers}</p>
        </div>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <p className="text-sm text-gray-500">Subtitle</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-end">
              <div className="relative inline-block">
                <button className="flex items-center border rounded px-3 py-1.5 text-sm">
                  {selectedMonth}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.customer}</td>
                      <td className="px-4 py-3 text-sm">{order.type}</td>
                      <td className="px-4 py-3 text-sm">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Inventory Summary */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Inventory Summary</h2>
            <p className="text-sm text-gray-500">Subtitle</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unit Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {inventory.map((item, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${item.stock < 5 ? "bg-red-200" : ""}`}>
                      <td className="px-4 py-3 text-sm">{item.id}</td>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm">lkr {item.price}</td>
                      <td className="px-4 py-3 text-sm">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardPage

