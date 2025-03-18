import { Link, useLocation } from "react-router-dom"
import { LayoutGrid, ShoppingCart, Package, Warehouse, Truck, Building2, User, BarChart3 } from "lucide-react"

const AdminSidebar = () => {
  const location = useLocation()
  const path = location.pathname

  // Determine which menu item is active based on the current path
  const isActive = (route: string) => {
    return path.startsWith(route)
  }

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6">
        <Link to="/admin/dashboard" className="text-xl font-bold">
          Logo
        </Link>
      </div>

      <nav className="mt-6">
        <Link
          to="/admin/dashboard"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/dashboard")
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <LayoutGrid className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/orders") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          Orders
        </Link>

        <Link
          to="/admin/products"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/products") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Package className="w-5 h-5 mr-3" />
          Product
        </Link>

        <Link
          to="/admin/inventory"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/inventory")
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Warehouse className="w-5 h-5 mr-3" />
          Inventory
        </Link>

        <Link
          to="/admin/shipping"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/shipping") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Truck className="w-5 h-5 mr-3" />
          Shipping
        </Link>

        <Link
          to="/admin/company"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/company") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Building2 className="w-5 h-5 mr-3" />
          Company
        </Link>

        <Link
          to="/admin/users"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/users") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5 mr-3" />
          User
        </Link>

        <Link
          to="/admin/reports"
          className={`px-4 py-3 flex items-center ${
            isActive("/admin/reports") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Report
        </Link>
      </nav>

      <div className="absolute bottom-0 w-64 border-t p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img src="/placeholder.svg?height=40&width=40" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar

