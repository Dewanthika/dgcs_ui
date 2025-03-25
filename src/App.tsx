import { Route, Routes } from "react-router-dom";

import DashboardManager from "./components/DashboardManager";
import AdminLayout from "./layouts/AdminLayout";
import LandingPageLayout from "./layouts/LandingPageLayout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CompanyPage from "./pages/company/CompanyPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import CustomerOrderViewPage from "./pages/CustomerOrderViewPage";
import EditOrderPage from "./pages/EditOrderPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/inventory/InventoryPage";
import LoginPage from "./pages/LoginPage";
import MyAccountPage from "./pages/MyAccountPage";
import OrdersListPage from "./pages/orders/OrdersListPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AddProductPage from "./pages/products/AddProductPage";
import ProductDetailPage from "./pages/products/ProductDetailsPage";
import ProductsListPage from "./pages/products/ProductsListPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ShippingPage from "./pages/ShippingPage";
import ShopPage from "./pages/ShopPage";
import UsersPage from "./pages/users/UsersPage";
import ViewOrderPage from "./pages/ViewOrderPage";

function App() {
  // In a real app, you would determine user type from authentication
  // const userType = "admin"; // Options: 'admin', 'customer', 'vendor', 'shipping'

  // // Function to redirect to the appropriate dashboard based on user type
  // const getDashboardRedirect = () => {
  //   switch (userType) {
  //     case "admin":
  //       return <Navigate to="/dashboard/dashboard" replace />;
  //     case "customer":
  //       return <Navigate to="/customer/dashboard" replace />;
  //     case "vendor":
  //       return <Navigate to="/vendor/dashboard" replace />;
  //     case "shipping":
  //       return <Navigate to="/shipping/dashboard" replace />;
  //     default:
  //       return <Navigate to="/customer/dashboard" replace />;
  //   }
  // };

  return (
    // <Router>
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Legacy dashboard route - redirects based on user type
        <Route path="/dashboard" element={getDashboardRedirect()} /> */}

        {/* Admin Routes - Using nested routes with AdminLayout */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardManager />} />

          {/* Product Management */}
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/add" element={<AddProductPage />} />

          {/* Order Management */}
          <Route path="orders" element={<OrdersListPage />} />
          <Route path="orders/create" element={<CreateOrderPage />} />
          <Route path="orders/:id/edit" element={<EditOrderPage />} />
          <Route path="orders/:id/view" element={<ViewOrderPage />} />

          {/* New Admin Pages */}
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="company" element={<CompanyPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Other Dashboard Types */}
        {/* <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
        <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
        <Route path="/shipping/dashboard" element={<ShippingDashboardPage />} /> */}

        {/* Customer-facing routes with Header and Footer */}
        <Route path="/" element={<LandingPageLayout />}>
          <Route element={<HomePage />} index />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/orders" element={<OrderSummaryPage />} />
          <Route path="/orders/:id" element={<CustomerOrderViewPage />} />
          <Route path="/account" element={<MyAccountPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
    // </Router>
  );
}

export default App;
