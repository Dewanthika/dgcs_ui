import AdminDashboardPage from "../../pages/dashboard/Admin";

const DashboardManager = () => {
  const userType = "admin"; // Options: 'admin', 'customer', 'vendor', 'shipping'
  switch (userType) {
    case "admin":
      return <AdminDashboardPage />;

    default:
      return <></>;
  }
};

export default DashboardManager;
