import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { getOrderById } from "../services/orderService";

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

const CustomerOrderViewPage = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const orderData = getOrderById(Number(id))
      setOrder(orderData)
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found</p>
          <Link to="/account" className="bg-black text-white py-2 px-4 rounded-md">
            Back to My Account
          </Link>
        </div>
      </div>
    )
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className="w-6 h-6 text-blue-500" />
      case "Shipped":
        return <Truck className="w-6 h-6 text-purple-500" />
      case "Delivered":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "Cancelled":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return <Package className="w-6 h-6 text-yellow-500" />
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/account" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{order.orderDate}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
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
              </div>
            </div>

            {/* Order Timeline */}
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>

              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="absolute left-0 rounded-full bg-green-100 p-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="ml-12">
                    <h3 className="font-medium">Order Placed</h3>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-sm mt-1">Your order has been placed successfully.</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div
                    className={`absolute left-0 rounded-full p-2 ${
                      order.orderStatus === "Processing" ||
                      order.orderStatus === "Shipped" ||
                      order.orderStatus === "Delivered"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Package
                      className={`w-6 h-6 ${
                        order.orderStatus === "Processing" ||
                        order.orderStatus === "Shipped" ||
                        order.orderStatus === "Delivered"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="ml-12">
                    <h3
                      className={`font-medium ${
                        order.orderStatus === "Processing" ||
                        order.orderStatus === "Shipped" ||
                        order.orderStatus === "Delivered"
                          ? ""
                          : "text-gray-400"
                      }`}
                    >
                      Processing
                    </h3>
                    <p
                      className={`text-sm ${
                        order.orderStatus === "Processing" ||
                        order.orderStatus === "Shipped" ||
                        order.orderStatus === "Delivered"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {order.orderStatus === "Processing"
                        ? "Your order is being processed."
                        : order.orderStatus === "Shipped" || order.orderStatus === "Delivered"
                          ? "Your order has been processed."
                          : "Waiting for processing"}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div
                    className={`absolute left-0 rounded-full p-2 ${
                      order.orderStatus === "Shipped" || order.orderStatus === "Delivered"
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Truck
                      className={`w-6 h-6 ${
                        order.orderStatus === "Shipped" || order.orderStatus === "Delivered"
                          ? "text-purple-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="ml-12">
                    <h3
                      className={`font-medium ${
                        order.orderStatus === "Shipped" || order.orderStatus === "Delivered" ? "" : "text-gray-400"
                      }`}
                    >
                      Shipped
                    </h3>
                    <p
                      className={`text-sm ${
                        order.orderStatus === "Shipped" || order.orderStatus === "Delivered"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {order.orderStatus === "Shipped"
                        ? "Your order is on the way."
                        : order.orderStatus === "Delivered"
                          ? "Your order has been shipped."
                          : "Waiting for shipment"}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div
                    className={`absolute left-0 rounded-full p-2 ${
                      order.orderStatus === "Delivered" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <CheckCircle
                      className={`w-6 h-6 ${order.orderStatus === "Delivered" ? "text-green-500" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="ml-12">
                    <h3 className={`font-medium ${order.orderStatus === "Delivered" ? "" : "text-gray-400"}`}>
                      Delivered
                    </h3>
                    <p className={`text-sm ${order.orderStatus === "Delivered" ? "text-gray-500" : "text-gray-400"}`}>
                      {order.orderStatus === "Delivered" ? "Your order has been delivered." : "Waiting for delivery"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Order Items</h2>
              </div>

              <div className="p-4">
                {order.items.map((item, index) => (
                  <div key={index} className={`flex py-4 ${index !== order.items.length - 1 ? "border-b" : ""}`}>
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt={item.productTitle}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.productTitle}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">LKR {(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">LKR {item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>LKR {order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>LKR 0.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>LKR {order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer and Shipping Information */}
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Shipping Information</h2>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{order.contact}</p>
                </div>

                {order.email && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{order.email}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{order.address}</p>
                  <p className="font-medium">
                    {order.city}, {order.district}
                  </p>
                  <p className="font-medium">{order.postalCode}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Payment Information</h2>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                {order.paymentDate && (
                  <div>
                    <p className="text-sm text-gray-500">Payment Date</p>
                    <p className="font-medium">{order.paymentDate}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">Credit Card</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="bg-black text-white py-2 px-6 rounded-md inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CustomerOrderViewPage

