import {
  BarChart3,
  Building2,
  LayoutGrid,
  Package,
  PackageSearch,
  ShoppingCart,
  Truck,
  User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import UserRoleEnum from "../constant/userRoleEnum";
import useAuth from "../hooks/useAuth";
import { getProfile } from "../store/selectors/userSelector";
import { useAppSelector } from "../store/store";

const AdminSidebar = () => {
  const location = useLocation();
  const { signout } = useAuth();
  const path = location.pathname;
  const user = useAppSelector(getProfile);

  const isActive = (route: string) => path.startsWith(route);

  // Role checking helper
  const hasAccess = (roles: UserRoleEnum[]) => {
    return user && roles.includes(user.userType);
  };

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6">
        <Link to="/" className="text-xl font-bold">
          <img
            src="/Logo.png?height=40&width=40"
            alt="Admin"
            className="w-full h-[100px] object-cover"
          />
        </Link>
      </div>

      <nav className="mt-6">
        <Link
          to="/dashboard"
          className={`px-4 py-3 flex items-center ${
            isActive("/dashboard/dashboard")
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <LayoutGrid className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        {hasAccess([UserRoleEnum.ADMIN, UserRoleEnum.STAFF]) && (
          <Link
            to="/dashboard/orders"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/orders")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </Link>
        )}

        {hasAccess([UserRoleEnum.ADMIN, UserRoleEnum.STAFF]) && (
          <Link
            to="/dashboard/category"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/category")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Category
          </Link>
        )}

        {hasAccess([UserRoleEnum.ADMIN, UserRoleEnum.STAFF]) && (
          <Link
            to="/dashboard/products"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/products")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Product
          </Link>
        )}

        {/* {hasAccess([UserRoleEnum.ADMIN, UserRoleEnum.STAFF]) && (
          <Link
            to="/dashboard/inventory"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/inventory")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Warehouse className="w-5 h-5 mr-3" />
            Inventory
          </Link>
        )} */}

        {hasAccess([UserRoleEnum.ADMIN]) && (
          <Link
            to="/dashboard/delivery"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/delivery")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PackageSearch className="w-5 h-5 mr-3" />
            Delivery
          </Link>
        )}

        {/* {hasAccess([UserRoleEnum.ADMIN, UserRoleEnum.STAFF]) && (
          <Link
            to="/dashboard/shipping"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/shipping")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Truck className="w-5 h-5 mr-3" />
            Shipping
          </Link>
        )} */}

        {hasAccess([UserRoleEnum.ADMIN]) && (
          <Link
            to="/dashboard/company"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/company")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Building2 className="w-5 h-5 mr-3" />
            Company
          </Link>
        )}

        {hasAccess([UserRoleEnum.ADMIN]) && (
          <Link
            to="/dashboard/users"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/users")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5 mr-3" />
            User
          </Link>
        )}

        {hasAccess([UserRoleEnum.ADMIN]) && (
          <Link
            to="/dashboard/reports"
            className={`px-4 py-3 flex items-center ${
              isActive("/dashboard/reports")
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Report
          </Link>
        )}
      </nav>

      <div className="absolute bottom-0 w-64 border-t p-4">
        <div className="flex items-center">
          {/* <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="ml-3">
            <p className="font-medium">{user?.fName || "Admin"}</p>
            <button onClick={signout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
