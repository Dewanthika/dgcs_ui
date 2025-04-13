import {
  ChevronDown,
  DollarSign,
  Package,
  ShoppingCart
} from "lucide-react";
import { useState } from "react";

const VendorDashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Mock data for the dashboard
  const stats = {
    totalSales: 45780,
    totalOrders: 324,
    totalProducts: 56,
    totalRevenue: 987650,
  };

  const products = [
    { id: 101, name: "Product Name 1", price: 1200, stock: 25, sold: 120 },
    { id: 102, name: "Product Name 2", price: 950, stock: 3, sold: 85 },
    { id: 103, name: "Product Name 3", price: 1500, stock: 18, sold: 65 },
  ];

  const recentOrders = [
    {
      id: 1234,
      customer: "John Doe",
      date: "2023-07-15",
      total: 2500,
      status: "Delivered",
    },
    {
      id: 1235,
      customer: "Jane Smith",
      date: "2023-07-18",
      total: 1800,
      status: "Processing",
    },
    {
      id: 1236,
      customer: "Robert Johnson",
      date: "2023-07-20",
      total: 3200,
      status: "Shipped",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

          <div className="relative inline-block">
            <button className="flex items-center border rounded px-3 py-1.5 bg-white">
              {selectedPeriod}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Sales</p>
                <p className="text-2xl font-bold mt-1">
                  LKR {stats.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  LKR {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Products</h2>
              <button className="text-indigo-600 text-sm hover:underline">
                View All
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Sold
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className={`hover:bg-gray-50 ${
                          product.stock < 5 ? "bg-red-100" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          LKR {product.price}
                        </td>
                        <td className="px-4 py-3 text-sm">{product.stock}</td>
                        <td className="px-4 py-3 text-sm">{product.sold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-indigo-600 text-sm hover:underline">
                View All
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">#{order.id}</td>
                        <td className="px-4 py-3 text-sm">{order.customer}</td>
                        <td className="px-4 py-3 text-sm">{order.date}</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardPage;
