import { useState } from "react";

const CustomerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock data for the dashboard
  const orders = [
    { id: 1234, date: "2023-05-15", total: 2500, status: "Delivered" },
    { id: 1235, date: "2023-06-20", total: 1800, status: "Processing" },
    { id: 1236, date: "2023-07-05", total: 3200, status: "Shipped" },
  ];

  const wishlist = [
    {
      id: 101,
      name: "Product Name 1",
      price: 1200,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 102,
      name: "Product Name 2",
      price: 950,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 103,
      name: "Product Name 3",
      price: 1500,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="md:col-span-3">
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">My Orders</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">#{order.id}</td>
                        <td className="px-4 py-3 text-sm">{order.date}</td>
                        <td className="px-4 py-3 text-sm">LKR {order.total}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">My Wishlist</h2>
              </div>

              <div className="divide-y">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex items-center hover:bg-gray-50"
                  >
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">LKR {item.price}</p>
                    </div>
                    <div>
                      <button className="bg-black text-white px-4 py-2 rounded text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Profile Information</h2>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value="John"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value="Doe"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value="customer@example.com"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value="+94 123 456 789"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Address
                  </label>
                  <textarea
                    value="123 Main St, Colombo, Sri Lanka"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={3}
                    readOnly
                  />
                </div>

                <div className="pt-4">
                  <button className="bg-black text-white px-4 py-2 rounded">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
