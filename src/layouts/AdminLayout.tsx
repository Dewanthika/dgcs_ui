import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area with Outlet for nested routes */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout

