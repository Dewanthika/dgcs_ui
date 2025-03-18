import { useState } from "react"
import { LayoutGrid, Truck, Package, MapPin, Settings, ChevronDown } from "lucide-react"

const ShippingDashboardPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Mock data for the dashboard
  const stats = {
    pendingShipments: 45,
    inTransit: 32,
    delivered: 128,
    returned: 8,
  }

  const shipments = [
    {
      id: "SHP1001",
      orderId: "1234",
      customer: "John Doe",
      destination: "Colombo, Sri Lanka",
      status: "Pending",
      date: "2023-07-20",
    },
    {
      id: "SHP1002",
      orderId: "1235",
      customer: "Jane Smith",
      destination: "Kandy, Sri Lanka",
      status: "In Transit",
      date: "2023-07-18",
    },
    {
      id: "SHP1003",
      orderId: "1236",
      customer: "Robert Johnson",
      destination: "Galle, Sri Lanka",
      status: "Delivered",
      date: "2023-07-15",
    },
    {
      id: "SHP1004",
      orderId: "1237",
      customer: "Emily Davis",
      destination: "Jaffna, Sri Lanka",
      status: "Returned",
      date: "2023-07-12",
    },
  ]

  // Filter shipments based on selected status
  const filteredShipments =
    selectedStatus === "All" ? shipments : shipments.filter((shipment) => shipment.status === selectedStatus)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Logo</h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-3 bg-indigo-50 flex items-center text-indigo-700 font-medium">
            <LayoutGrid className="w-5 h-5 mr-3" />
            Dashboard
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Truck className="w-5 h-5 mr-3" />
            Shipments
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Package className="w-5 h-5 mr-3" />
            Packages
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Tracking
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 border-t p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Shipping Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium">Shipping Agent</p>
              <p className="text-xs text-gray-500">Agent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Shipping Dashboard</h1>

          <div className="relative inline-block">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none border rounded px-3 py-1.5 bg-white pr-8"
            >
              <option value="All">All Shipments</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold mt-1">{stats.pendingShipments}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Transit</p>
                <p className="text-2xl font-bold mt-1">{stats.inTransit}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Delivered</p>
                <p className="text-2xl font-bold mt-1">{stats.delivered}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Returned</p>
                <p className="text-2xl font-bold mt-1">{stats.returned}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Shipments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Shipment ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Destination</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{shipment.id}</td>
                    <td className="px-4 py-3 text-sm">#{shipment.orderId}</td>
                    <td className="px-4 py-3 text-sm">{shipment.customer}</td>
                    <td className="px-4 py-3 text-sm">{shipment.destination}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          shipment.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : shipment.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : shipment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{shipment.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDashboardPage

