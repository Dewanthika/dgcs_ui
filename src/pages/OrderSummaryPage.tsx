import { useState } from "react"

interface Order {
  id: number
  name: string
  paymentStatus: string
  total: number
  contact: string
  status: "in-progress" | "cancelled" | "delivered" | "processing" | "shipped" | "returned"
}

const OrderSummaryPage = () => {
  const [activeTab, setActiveTab] = useState("all")

  // Sample orders data
  const allOrders: Order[] = [
    {
      id: 1,
      name: "Andrew Smith",
      paymentStatus: "Paid",
      total: 12023,
      contact: "andrewsmith@quest.ai",
      status: "in-progress",
    },
    {
      id: 2,
      name: "Andrew Smith",
      paymentStatus: "Paid",
      total: 12023,
      contact: "andrewsmith@quest.ai",
      status: "cancelled",
    },
    {
      id: 3,
      name: "Andrew Smith",
      paymentStatus: "Paid",
      total: 12023,
      contact: "andrewsmith@quest.ai",
      status: "delivered",
    },
    {
      id: 4,
      name: "Andrew Smith",
      paymentStatus: "Paid",
      total: 12023,
      contact: "andrewsmith@quest.ai",
      status: "delivered",
    },
    {
      id: 5,
      name: "Andrew Smith",
      paymentStatus: "Paid",
      total: 12023,
      contact: "andrewsmith@quest.ai",
      status: "delivered",
    },
  ]

  // Filter orders based on active tab
  const filteredOrders = activeTab === "all" ? allOrders : allOrders.filter((order) => order.status === activeTab)

  // Status badge component
  const StatusBadge = ({ status }: { status: Order["status"] }) => {
    const statusConfig = {
      "in-progress": { text: "In Progress", bgColor: "bg-orange-500" },
      cancelled: { text: "Cancelled", bgColor: "bg-red-500" },
      delivered: { text: "Delivered", bgColor: "bg-green-500" },
      processing: { text: "Processing", bgColor: "bg-blue-500" },
      shipped: { text: "Shipped", bgColor: "bg-purple-500" },
      returned: { text: "Returned", bgColor: "bg-yellow-500" },
    }

    const { text, bgColor } = statusConfig[status]

    return <span className={`${bgColor} text-white text-xs px-3 py-1 rounded-full`}>{text}</span>
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Summary</h1>

      {/* Order Status Tabs */}
      <div className="border-b mb-6">
        <div className="flex">
          <button
            className={`py-3 px-4 font-medium ${activeTab === "all" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("all")}
          >
            ALL ORDER
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === "processing" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("processing")}
          >
            PROCESSING
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === "shipped" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("shipped")}
          >
            SHIPPED
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === "returned" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("returned")}
          >
            RETURNED
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === "delivered" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("delivered")}
          >
            DELIVERED
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Name</th>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Payment Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Total</th>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Contact</th>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">{order.name}</td>
                <td className="py-4 px-6">{order.paymentStatus}</td>
                <td className="py-4 px-6">LKR {order.total}</td>
                <td className="py-4 px-6">{order.contact}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}
    </div>
  )
}

export default OrderSummaryPage

