
import useFetch from "../../../hooks/useFetch";
import IOrder from "../../../types/IOrder";
import IUser from "../../../types/IUser";

const AdminDashboardPage = () => {
  const { data: totalOrdersCount } = useFetch<{ totalOrders: number }>({
    url: "/orders/total-last-30-days",
    initialLoad: true,
  });

  const { data: totalCustomersCount } = useFetch<{ totalCustomers: number }>({
    url: "/user/total-last-30-days",
    initialLoad: true,
  });

  const { data: totalRevenueCount } = useFetch<{ totalRevenue: number }>({
    url: "/orders/revenue-last-30-days",
    initialLoad: true,
  });

  const { data: newCustomersCount } = useFetch<{ newCustomers: number }>({
    url: "/user/new-last-30-days",
    initialLoad: true,
  });

  const stats = {
    totalOrders: totalOrdersCount?.totalOrders ?? 0,
    totalCustomers: totalCustomersCount?.totalCustomers ?? 0,
    totalRevenue: totalRevenueCount?.totalRevenue ?? 0,
    newCustomers: newCustomersCount?.newCustomers ?? 0,
  };

  const { data: recentOrders } = useFetch<IOrder[]>({
    url: "/orders/recent",
    initialLoad: true,
  });

  const { data: lowStockProducts, isLoading, error } = useFetch<any[]>({
    url: "/product/low-stock",
    initialLoad: true,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-orange-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Orders</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">
            {stats.totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-green-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Customers</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">
            {stats.totalCustomers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-indigo-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">Total Revenue</p>
          <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
          <p className="text-4xl font-bold">
            LKR {stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">New Customers</p>
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
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  {recentOrders?.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        #{order._id.slice(18).toUpperCase()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(order.userID as IUser).fName || "Company"}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.orderType}</td>
                      <td className="px-4 py-3 text-sm">
                        {order.orderStatus?.toLowerCase() === "complete" ? (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-400 rounded-sm shadow-lg">
                            Complete
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-yellow-400 rounded-sm shadow-lg">
                            Pending
                          </span>
                        )}
                      </td>
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
            <h2 className="text-xl font-bold">Stock Low Products</h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-gray-500 px-4 py-2">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500 px-4 py-2">{error}</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product ID</th> */}
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unit Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lowStockProducts?.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item.stock !== undefined &&
                          item.reorderLevel !== undefined &&
                          item.stock <= item.reorderLevel
                            ? "bg-red-50 hover:bg-red-100"
                            : "hover:bg-gray-50"
                        }
                      >
                        {/* <td className="px-4 py-3 text-sm">{item._id}</td> */}
                        <td className="px-4 py-3 text-sm">{item.productName}</td>
                        <td className="px-4 py-3 text-sm">LKR {item.price}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-red-700">
                          {item.stock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
