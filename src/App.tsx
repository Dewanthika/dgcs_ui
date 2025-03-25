import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import DashboardManager from "./components/DashboardManager";
import AdminLayout from "./layouts/AdminLayout";
import LandingPageLayout from "./layouts/LandingPageLayout";
import CartPage from "./pages/landingPage/CartPage";
import CheckoutPage from "./pages/landingPage/CheckoutPage";
import CompanyPage from "./pages/company/CompanyPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import CustomerOrderViewPage from "./pages/CustomerOrderViewPage";
import EditOrderPage from "./pages/EditOrderPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/inventory/InventoryPage";
import LoginPage from "./pages/auth/LoginPage";
import MyAccountPage from "./pages/MyAccountPage";
import OrdersListPage from "./pages/orders/OrdersListPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AddProductPage from "./pages/products/AddProductPage";
import ProductDetailPage from "./pages/products/ProductDetailsPage";
import ProductsListPage from "./pages/products/ProductsListPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import ShippingPage from "./pages/ShippingPage";
import ShopPage from "./pages/ShopPage";
import UsersPage from "./pages/users/UsersPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Admin Routes - Using nested routes with AdminLayout */}
        <Route
          element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }
        >
          {/* Dashboard Management */}
          <Route path="/dashboard" element={<DashboardManager />} />

          {/* Product Management */}
          <Route path="/dashboard/products" element={<ProductsListPage />} />
          <Route path="/dashboard/products/add" element={<AddProductPage />} />

          {/* Order Management */}
          <Route path="/dashboard/orders" element={<OrdersListPage />} />
          <Route
            path="/dashboard/orders/create"
            element={<CreateOrderPage />}
          />
          <Route
            path="/dashboard/orders/:id/edit"
            element={<EditOrderPage />}
          />
          <Route
            path="/dashboard/orders/:id/view"
            element={<ViewOrderPage />}
          />

          {/* New Admin Pages */}
          <Route path="/dashboard/inventory" element={<InventoryPage />} />
          <Route path="/dashboard/shipping" element={<ShippingPage />} />
          <Route path="/dashboard/company" element={<CompanyPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
        </Route>

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
        <Route element={<GuestGuard />}>
          <Route path={"/"} element={<Outlet />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
