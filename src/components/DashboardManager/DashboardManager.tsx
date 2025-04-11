import CustomerDashboardPage from "../../pages/dashboard/Customer/CustomerDashboardPage";
import AdminDashboardPage from "../../pages/dashboard/Admin";
import ShippingDashboardPage from "../../pages/dashboard/Shipping/ShippingDashboardPage";
import VendorDashboardPage from "../../pages/dashboard/Vender/VendorDashboardPage";

import { useAppSelector } from "../../store/store";
import { getProfile } from "../../store/selectors/userSelector";
import UserRoleEnum from "../../constant/userRoleEnum";

const DashboardManager = () => {
  const user = useAppSelector(getProfile);

  if (!user?.userType) return <></>;

  switch (user.userType) {
    case UserRoleEnum.ADMIN:
      return <AdminDashboardPage />;
    case UserRoleEnum.INDIVIDUAL:
      return <CustomerDashboardPage />;
    case UserRoleEnum.COMPANY:
      return <VendorDashboardPage />;
    case UserRoleEnum.STAFF:
      return <ShippingDashboardPage />;
    default:
      return <></>;
  }
};

export default DashboardManager;
