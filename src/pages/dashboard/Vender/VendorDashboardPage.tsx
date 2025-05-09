import { DollarSign, ShoppingCart } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import { getProfile } from "../../../store/selectors/userSelector";
import { useAppSelector } from "../../../store/store";
import ICompany from "../../../types/ICompany";
import { useState } from "react";

interface IOrder {
  _id: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
}

const VendorDashboardPage = () => {
  const profile = useAppSelector(getProfile);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (order: IOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const {
    data: companies,
    error: companyError,
    isLoading: companyLoading,
  } = useFetch<ICompany[]>({
    url: "/company",
    initialLoad: true,
  });

  const { data: companyOrders } = useFetch<IOrder[]>({
    url: `/orders/user/${profile?._id}`,
    initialLoad: true,
  });

  const { data: orderCounts } = useFetch<IOrder[]>({
    url: `/orders/total/${profile?._id}`,
    initialLoad: true,
  });

  const { data: totalRev } = useFetch<IOrder[]>({
    url: `/orders/revenue/${profile?._id}`,
    initialLoad: true,
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Company User Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Purchase</p>
                <p className="text-2xl font-bold mt-1">
                  LKR {totalRev?.totalRevenue?.toLocaleString()}
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
                <p className="text-2xl font-bold mt-1">
                  {orderCounts?.totalOrders?.toString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Company Data & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Company Data</h2>
            {companyLoading && <p>Loading company data...</p>}
            {companyError && (
              <p className="text-red-600">Error loading company data</p>
            )}
            {!companyLoading && !companyError && companies?.length === 0 && (
              <p>No company data available.</p>
            )}
            {!companyLoading &&
              !companyError &&
              companies &&
              companies.length > 0 && (
                <div className="space-y-8">
                  {companies.map((company) => (
                    <div
                      key={company._id}
                      className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <p>Credit Limit: {company.creditLimit}</p>
                      <p>Discount: {company.discount}</p>
                      <p>Payment Terms: {company.paymentTerms}</p>
                      <p>Status: {company.status}</p>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Orders</h2>
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
                        Date
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
                    {companyOrders &&
                      companyOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm">#{order._id}</td>
                          <td className="px-4 py-2 text-sm">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm capitalize">
                            {order.orderStatus}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <button
                              onClick={() => handleView(order)}
                              className="text-indigo-600 hover:underline cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal with blur background */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="text-gray-500">#{selectedOrder._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-500">
                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className=" capitalize bg-green-500 py-1 px-3 shadow-lg rounded-md text-sm text-white">
                    {selectedOrder.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-500">
                    LKR {selectedOrder.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboardPage;
