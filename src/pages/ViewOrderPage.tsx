import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Edit, ArrowLeft } from "lucide-react"
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

const ViewOrderPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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
      <>
        <div className="flex items-center justify-center h-full">
          <p>Loading order data...</p>
        </div>
      </>
    )
  }

  if (!order) {
    return (
      <>
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found</p>
          <button onClick={() => navigate("/admin/orders")} className="bg-indigo-600 text-white py-2 px-4 rounded-md">
            Back to Orders
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate("/admin/orders")} className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        </div>
        <Link
          to={`/admin/orders/${order.id}/edit`}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <Edit className="w-5 h-5 mr-1" />
          Edit Order
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{order.orderDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Order Status</p>
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
                </div>

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

                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-medium">{order.paymentDate || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">LKR {order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Order Items</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{item.productTitle}</td>
                      <td className="px-4 py-3 text-sm">LKR {item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm font-medium">LKR {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium">
                      Total:
                    </td>
                    <td className="px-4 py-3 font-bold">LKR {order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Customer Information</h2>
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
                <p className="text-sm text-gray-500">Shipping Address</p>
                <p className="font-medium">{order.address}</p>
                <p className="font-medium">
                  {order.city}, {order.district}
                </p>
                <p className="font-medium">{order.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Order Timeline</h2>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order Created</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {order.updatedAt && (
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Updated</p>
                      <p className="text-xs text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {order.orderStatus === "Processing" && (
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Processing</p>
                      <p className="text-xs text-gray-500">Order is being processed</p>
                    </div>
                  </div>
                )}

                {order.orderStatus === "Shipped" && (
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Shipped</p>
                      <p className="text-xs text-gray-500">Order has been shipped</p>
                    </div>
                  </div>
                )}

                {order.orderStatus === "Delivered" && (
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Delivered</p>
                      <p className="text-xs text-gray-500">Order has been delivered</p>
                    </div>
                  </div>
                )}

                {order.orderStatus === "Cancelled" && (
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cancelled</p>
                      <p className="text-xs text-gray-500">Order has been cancelled</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewOrderPage

