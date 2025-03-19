import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"

interface OrderItem {
  orderItemID: string
  productID: number
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: number
  orderID: string
  userID: string
  customerName: string
  contact: string
  deliveryAddress: string
  orderWeight: number
  deliveryCharge: number
  orderType: string
  paymentMethod: string
  orderStatus: string
  totalAmount: number
  orderDate: string
  orderItems: OrderItem[]
}

const OrdersListPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    // Load mock orders data
    const mockOrders: Order[] = [
      {
        id: 1,
        orderID: "ORD001",
        userID: "USR002",
        customerName: "John Doe",
        contact: "+94 234 567 890",
        deliveryAddress: "456 Customer Ave, Kandy, Central Province, 20000",
        orderWeight: 2.5,
        deliveryCharge: 350,
        orderType: "Standard",
        paymentMethod: "Credit Card",
        orderStatus: "Processing",
        totalAmount: 2850,
        orderDate: "2023-07-15",
        orderItems: [
          {
            orderItemID: "ITEM001",
            productID: 101,
            productName: "Smartphone X",
            quantity: 1,
            price: 799,
          },
          {
            orderItemID: "ITEM002",
            productID: 103,
            productName: "Wireless Headphones",
            quantity: 1,
            price: 149,
          },
        ],
      },
      {
        id: 2,
        orderID: "ORD002",
        userID: "USR003",
        customerName: "Jane Smith",
        contact: "+94 345 678 901",
        deliveryAddress: "789 User Blvd, Galle",
        orderWeight: 1.2,
        deliveryCharge: 250,
        orderType: "Express",
        paymentMethod: "Cash on Delivery",
        orderStatus: "Shipped",
        totalAmount: 1549,
        orderDate: "2023-07-14",
        orderItems: [
          {
            orderItemID: "ITEM003",
            productID: 104,
            productName: "Smart Watch",
            quantity: 1,
            price: 249,
          },
          {
            orderItemID: "ITEM004",
            productID: 105,
            productName: "Bluetooth Speaker",
            quantity: 1,
            price: 99,
          },
        ],
      },
      {
        id: 3,
        orderID: "ORD003",
        userID: "USR002",
        customerName: "John Doe",
        contact: "+94 234 567 890",
        deliveryAddress: "456 Customer Ave, Kandy, Central Province, 20000",
        orderWeight: 3.8,
        deliveryCharge: 450,
        orderType: "Standard",
        paymentMethod: "Credit Card",
        orderStatus: "Delivered",
        totalAmount: 1749,
        orderDate: "2023-07-10",
        orderItems: [
          {
            orderItemID: "ITEM005",
            productID: 102,
            productName: "Laptop Pro",
            quantity: 1,
            price: 1299,
          },
        ],
      },
      {
        id: 4,
        orderID: "ORD004",
        userID: "USR006",
        customerName: "New Customer",
        contact: "+94 678 901 234",
        deliveryAddress: "303 New User St, Matara",
        orderWeight: 0.5,
        deliveryCharge: 150,
        orderType: "Express",
        paymentMethod: "PayPal",
        orderStatus: "Cancelled",
        totalAmount: 249,
        orderDate: "2023-07-12",
        orderItems: [
          {
            orderItemID: "ITEM006",
            productID: 104,
            productName: "Smart Watch",
            quantity: 1,
            price: 249,
          },
        ],
      },
    ]

    setOrders(mockOrders)
  }, [])

  const handleDeleteOrder = (id: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id))
    }
  }

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.orderStatus.toLowerCase() === selectedStatus.toLowerCase()
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Get unique statuses from orders
  const statuses = ["all", ...new Set(orders.map((order) => order.orderStatus.toLowerCase()))]

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Link
          to="/admin/orders/create"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Create Order
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search orders by customer name, contact, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{order.orderID}</td>
                    <td className="px-4 py-3 text-sm">
                      <div>{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.contact}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.orderDate}</td>
                    <td className="px-4 py-3 text-sm font-medium">LKR {order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "Shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.orderStatus === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.paymentMethod}</td>
                    <td className="px-4 py-3 text-sm">{order.orderType}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/orders/${order.id}/view`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/admin/orders/${order.id}/edit`}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                    No orders found.{" "}
                    {searchTerm || selectedStatus !== "all"
                      ? "Try changing your filters."
                      : "Create some orders to get started."}
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

export default OrdersListPage

