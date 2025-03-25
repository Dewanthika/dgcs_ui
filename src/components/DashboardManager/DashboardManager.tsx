import CustomerDashboardPage from "../../pages/dashboard/Customer/CustomerDashboardPage";
import AdminDashboardPage from "../../pages/dashboard/Admin";
import ShippingDashboardPage from "../../pages/dashboard/Shipping/ShippingDashboardPage";
import VendorDashboardPage from "../../pages/dashboard/Vender/VendorDashboardPage";

const DashboardManager = () => {
  const userType = "admin"; // Options: 'admin', 'customer', 'vendor', 'shipping'

  switch (userType) {
    case "admin":
      return <AdminDashboardPage />;
    case "customer":
      return <CustomerDashboardPage />;
    case "vendor":
      return <VendorDashboardPage />;
    case "shipping":
      return <ShippingDashboardPage />;

    default:
      return <></>;
  }
};

export default DashboardManager;
