import { DollarSign, ShoppingCart } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import { getProfile } from "../../../store/selectors/userSelector";
import { useAppSelector } from "../../../store/store";
import ICompany from "../../../types/ICompany";

interface IOrder {
  _id: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
}

const VendorDashboardPage = () => {
  // const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const profile = useAppSelector(getProfile);

  // Fetch company data from backend
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
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

          {/* <div className="relative inline-block">
            <button className="flex items-center border rounded px-3 py-1.5 bg-white">
              {selectedPeriod}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Sales</p>
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

          {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div> */}
          {/* 
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  LKR {totalRev?.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Products and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Company Data</h2>
            {companyLoading && <p>Loading company data...</p>}
            {companyError && (
              <p className="text-red-600">Error loading company data</p>
            )}
            {!companyLoading &&
              !companyError &&
              companies &&
              companies.length === 0 && <p>No company data available.</p>}
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
                      {/* <h3 className="text-lg font-semibold mb-2">
                        Company User ID: {company.userId}
                      </h3> */}
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
                    {companyOrders &&
                      companyOrders?.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm">#{order._id}</td>
                          <td className="px-4 py-2 text-sm">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {order.orderStatus}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            LKR {order.totalAmount.toLocaleString()}
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
