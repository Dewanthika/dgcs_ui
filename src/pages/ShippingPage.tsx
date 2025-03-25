import { useState, useEffect } from "react"
import { Truck, Package, CheckCircle, ArrowUpDown, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { getAllOrders } from "../services/orderService"

interface OrderItem {
  productId: number
  productTitle: string
  quantity: number
  price: number
}

interface Order {
  id: number
  customerName: string
  contact: string
  email: string
  address: string
  city: string
  district: string
  postalCode: string
  paymentDate: string
  paymentStatus: string
  items: OrderItem[]
  totalAmount: number
  orderStatus: string
  orderDate: string
  createdAt: string
  updatedAt?: string
}

interface ShippingRecord {
  id: string
  orderId: number
  trackingNumber: string
  carrier: string
  status: string
  estimatedDelivery: string
  shippedDate: string
  deliveredDate?: string
}

const ShippingPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [shippingRecords, setShippingRecords] = useState<ShippingRecord[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<string>("shippedDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    // Load orders from our service
    const loadedOrders = getAllOrders()
    setOrders(loadedOrders)

    // Generate mock shipping records based on orders
    const mockShippingRecords: ShippingRecord[] = loadedOrders
      .filter((order) => ["Processing", "Shipped", "Delivered"].includes(order.orderStatus))
      .map((order) => {
        const shippedDate = new Date(order.createdAt)
        shippedDate.setDate(shippedDate.getDate() + 1) // Shipped 1 day after order creation

        const estimatedDelivery = new Date(shippedDate)
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 3) // Estimated delivery 3 days after shipping

        let deliveredDate: Date | undefined
        if (order.orderStatus === "Delivered") {
          deliveredDate = new Date(shippedDate)
          deliveredDate.setDate(deliveredDate.getDate() + 2) // Delivered 2 days after shipping
        }

        const carriers = ["FedEx", "DHL", "UPS", "USPS", "Local Courier"]
        const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)]

        return {
          id: `SHP${Math.floor(10000 + Math.random() * 90000)}`,
          orderId: order.id,
          trackingNumber: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
          carrier: randomCarrier,
          status:
            order.orderStatus === "Processing"
              ? "Pending"
              : order.orderStatus === "Shipped"
                ? "In Transit"
                : "Delivered",
          estimatedDelivery: estimatedDelivery.toISOString().split("T")[0],
          shippedDate: shippedDate.toISOString().split("T")[0],
          deliveredDate: deliveredDate?.toISOString().split("T")[0],
        }
      })

    setShippingRecords(mockShippingRecords)
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort shipping records
  const filteredRecords = shippingRecords
    .filter((record) => {
      // Apply search filter
      const matchesSearch =
        record.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(record.orderId).includes(searchTerm)

      // Apply status filter
      const matchesStatusFilter = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatusFilter
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "shippedDate") {
        return sortDirection === "asc"
          ? new Date(a.shippedDate).getTime() - new Date(b.shippedDate).getTime()
          : new Date(b.shippedDate).getTime() - new Date(a.shippedDate).getTime()
      } else if (sortField === "estimatedDelivery") {
        return sortDirection === "asc"
          ? new Date(a.estimatedDelivery).getTime() - new Date(b.estimatedDelivery).getTime()
          : new Date(b.estimatedDelivery).getTime() - new Date(a.estimatedDelivery).getTime()
      } else if (sortField === "orderId") {
        return sortDirection === "asc" ? a.orderId - b.orderId : b.orderId - a.orderId
      }
      return 0
    })

  // Get customer name from order
  const getCustomerName = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId)
    return order?.customerName || "Unknown"
  }

  // Update shipping status
  const updateShippingStatus = (id: string, newStatus: string) => {
    const updatedRecords = shippingRecords.map((record) => {
      if (record.id === id) {
        const updatedRecord = { ...record, status: newStatus }

        // If status is Delivered, add delivered date
        if (newStatus === "Delivered") {
          updatedRecord.deliveredDate = new Date().toISOString().split("T")[0]
        } else {
          delete updatedRecord.deliveredDate
        }

        return updatedRecord
      }
      return record
    })

    setShippingRecords(updatedRecords)

    // Also update the corresponding order status
    const record = shippingRecords.find((r) => r.id === id)
    if (record) {
      const statusMap: Record<string, string> = {
        Pending: "Processing",
        "In Transit": "Shipped",
        Delivered: "Delivered",
      }

      const updatedOrders = orders.map((order) => {
        if (order.id === record.orderId) {
          return { ...order, orderStatus: statusMap[newStatus] || order.orderStatus }
        }
        return order
      })

      setOrders(updatedOrders)
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipping Management</h1>
      </div>

      {/* Shipping Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold mt-1">{shippingRecords.filter((r) => r.status === "Pending").length}</p>
            </div>
            <Package className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">In Transit</p>
              <p className="text-2xl font-bold mt-1">
                {shippingRecords.filter((r) => r.status === "In Transit").length}
              </p>
            </div>
            <Truck className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold mt-1">
                {shippingRecords.filter((r) => r.status === "Delivered").length}
              </p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-gray-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-2xl font-bold mt-1">{shippingRecords.length}</p>
            </div>
            <Truck className="h-10 w-10 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by tracking number or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Shipments</option>
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Shipment ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("orderId")}>
                    Order ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tracking #</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Carrier</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("shippedDate")}>
                    Shipped Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("estimatedDelivery")}>
                    Est. Delivery
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{record.id}</td>
                    <td className="px-4 py-3 text-sm">#{record.orderId}</td>
                    <td className="px-4 py-3 text-sm">{getCustomerName(record.orderId)}</td>
                    <td className="px-4 py-3 text-sm">{record.trackingNumber}</td>
                    <td className="px-4 py-3 text-sm">{record.carrier}</td>
                    <td className="px-4 py-3 text-sm">{record.shippedDate}</td>
                    <td className="px-4 py-3 text-sm">{record.estimatedDelivery}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          record.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : record.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <Link
                          to={`/dashboard/orders/${record.orderId}/view`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Order"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>

                        {record.status !== "Delivered" && (
                          <button
                            onClick={() =>
                              updateShippingStatus(record.id, record.status === "Pending" ? "In Transit" : "Delivered")
                            }
                            className={`px-2 py-1 rounded text-xs ${
                              record.status === "Pending"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                          >
                            {record.status === "Pending" ? "Mark Shipped" : "Mark Delivered"}
                          </button>
                        )}

                        {record.status === "Delivered" && (
                          <button
                            onClick={() => updateShippingStatus(record.id, "In Transit")}
                            className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            Undo Delivery
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                    No shipments found. {searchTerm || statusFilter !== "all" ? "Try changing your filters." : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ShippingPage

