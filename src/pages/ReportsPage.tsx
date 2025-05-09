import { useState } from "react"
import { Download, Calendar, ArrowDown, ArrowUp } from "lucide-react"

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("sales")
  const [dateRange, setDateRange] = useState("last30days")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  // Mock data for reports  = useState("")
  // const [customEndDate, setCustomEndDate] = useState("") // Removed duplicate declaration

  // Mock data for reports
  const salesData = [
    // { month: "Jan", revenue: 45000, orders: 120, growth: 5.2 },
    // { month: "Feb", revenue: 52000, orders: 145, growth: 15.5 },
    // { month: "Mar", revenue: 48000, orders: 130, growth: -7.7 },
    { month: "Apr", revenue: 51000, orders: 142, growth: 6.3 },
    { month: "May", revenue: 58000, orders: 160, growth: 13.7 },
    // { month: "Jun", revenue: 62000, orders: 175, growth: 6.9 },
    // { month: "Jul", revenue: 68000, orders: 190, growth: 9.7 },
    // { month: "Aug", revenue: 72000, orders: 210, growth: 5.9 },
    // { month: "Sep", revenue: 69000, orders: 200, growth: -4.2 },
    // { month: "Oct", revenue: 74000, orders: 220, growth: 7.2 },
    // { month: "Nov", revenue: 82000, orders: 245, growth: 10.8 },
    // { month: "Dec", revenue: 96000, orders: 280, growth: 17.1 },
  ]

  const productData = [
    { category: "Electronics", sales: 42000, units: 350, profit: 12600 },
    { category: "Clothing", sales: 38000, units: 720, profit: 15200 },
    { category: "Home & Kitchen", sales: 29000, units: 480, profit: 8700 },
    { category: "Books", sales: 18000, units: 900, profit: 7200 },
    { category: "Toys", sales: 15000, units: 320, profit: 4500 },
  ]

  const customerData = [
    { segment: "New", count: 450, revenue: 32000, avgOrderValue: 71 },
    { segment: "Returning", count: 320, revenue: 48000, avgOrderValue: 150 },
    { segment: "Loyal", count: 180, revenue: 36000, avgOrderValue: 200 },
    { segment: "VIP", count: 50, revenue: 24000, avgOrderValue: 480 },
  ]

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`
  }

  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  const handleDownloadReport = () => {
    alert(`Downloading ${selectedReport} report for ${dateRange} period`)
    // In a real app, this would generate and download a CSV or PDF report
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <button
          onClick={handleDownloadReport}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <Download className="w-5 h-5 mr-1" />
          Download Report
        </button>
      </div>

      {/* Report Selection and Date Range */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              id="reportType"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full sm:w-48 p-2 border border-gray-300 rounded-md"
            >
              <option value="sales">Sales Report</option>
              <option value="products">Product Performance</option>
              <option value="customers">Customer Analysis</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                <select
                  id="dateRange"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full sm:w-40 p-2 border border-gray-300 rounded-md"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="thisYear">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            {dateRange === "custom" && (
              <div className="flex gap-2 items-end">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">
            {selectedReport === "sales" && "Sales Report"}
            {selectedReport === "products" && "Product Performance"}
            {selectedReport === "customers" && "Customer Analysis"}
          </h2>
        </div>

        <div className="p-6">
          {/* Sales Report */}
          {selectedReport === "sales" && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(salesData.reduce((sum, item) => sum + item.revenue, 0))}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-3xl font-bold mt-1">{salesData.reduce((sum, item) => sum + item.orders, 0)}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-3xl font-bold mt-1">
                    {formatCurrency(
                      salesData.reduce((sum, item) => sum + item.revenue, 0) / 
                      salesData.reduce((sum, item) => sum + item.orders, 0)
                    )}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Growth Rate</p>
                  <div className="flex items-center mt-1">
                    <p className="text-3xl font-bold">
                      {formatPercentage(salesData.reduce((sum, item) => sum + item.growth, 0) / salesData.length)}
                    </p>
                    {salesData.reduce((sum, item) => sum + item.growth, 0) > 0 ? (
                      <ArrowUp className="ml-2 text-green-500" />
                    ) : (
                      <ArrowDown className="ml-2 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Sales Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Month</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Orders</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {salesData.map((item) => (
                      <tr key={item.month} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{item.month}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(item.revenue)}</td>
                        <td className="px-4 py-3 text-sm">{item.orders}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <span className={item.growth > 0 ? "text-green-600" : "text-red-600"}>
                              {formatPercentage(item.growth)}
                            </span>
                            {item.growth > 0 ? (
                              <ArrowUp className="ml-1 w-4 h-4 text-green-500" />
                            ) : (
                              <ArrowDown className="ml-1 w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Performance */}
          {selectedReport === "products" && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Product Sales</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(productData.reduce((sum, item) => sum + item.sales, 0))}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Units Sold</p>
                  <p className="text-3xl font-bold mt-1\">{productData.reduce((sum, item) => sum + item.units, 0)}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Profit</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(productData.reduce((sum, item) => sum + item.profit, 0))}</p>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sales</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Units Sold</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Profit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Profit Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {productData.map((item) => (
                      <tr key={item.category} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{item.category}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(item.sales)}</td>
                        <td className="px-4 py-3 text-sm">{item.units}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(item.profit)}</td>
                        <td className="px-4 py-3 text-sm">
                          {formatPercentage((item.profit / item.sales) * 100)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customer Analysis */}
          {selectedReport === "customers" && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-3xl font-bold mt-1">{customerData.reduce((sum, item) => sum + item.count, 0)}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(customerData.reduce((sum, item) => sum + item.revenue, 0))}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-3xl font-bold mt-1">
                    {formatCurrency(
                      customerData.reduce((sum, item) => sum + (item.avgOrderValue * item.count), 0) / 
                      customerData.reduce((sum, item) => sum + item.count, 0)
                    )}
                  </p>
                </div>
              </div>

              {/* Customer Segments Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Segment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer Count</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg. Order Value</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {customerData.map((item) => (
                      <tr key={item.segment} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{item.segment}</td>
                        <td className="px-4 py-3 text-sm">{item.count}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(item.revenue)}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(item.avgOrderValue)}</td>
                        <td className="px-4 py-3 text-sm">
                          {formatPercentage(
                            (item.count / customerData.reduce((sum, i) => sum + i.count, 0)) * 100
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReportsPage

