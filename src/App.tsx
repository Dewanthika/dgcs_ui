import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderSummaryPage from "./pages/OrderSummaryPage"
import ProductDetailPage from "./pages/ProductDetailsPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import MyAccountPage from "./pages/MyAccountPage"
import PaymentSuccessPage from "./pages/PaymentSuccessPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import CustomerDashboardPage from "./pages/CustomerDashboardPage"
import VendorDashboardPage from "./pages/VendorDashboardPage"
import ShippingDashboardPage from "./pages/ShippingDashboardPage"
import AddProductPage from "./pages/AddProductPage"
import ProductsListPage from "./pages/ProductsListPage"
import CreateOrderPage from "./pages/CreateOrderPage"
import EditOrderPage from "./pages/EditOrderPage"
import OrdersListPage from "./pages/OrdersListPage"
import ViewOrderPage from "./pages/ViewOrderPage"
import CustomerOrderViewPage from "./pages/CustomerOrderViewPage"
import AdminLayout from "./layouts/AdminLayout"
import InventoryPage from "./pages/InventoryPage"
import ShippingPage from "./pages/ShippingPage"
import CompanyPage from "./pages/CompanyPage"
import UsersPage from "./pages/UsersPage"
import ReportsPage from "./pages/ReportsPage"

function App() {

  const userType = "admin";

  const getDashboardRedirect = () => {
    switch (userType) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />
      case "customer":
        return <Navigate to="/customer/dashboard" replace />
      case "vendor":
        return <Navigate to="/vendor/dashboard" replace />
      case "shipping":
        return <Navigate to="/shipping/dashboard" replace />
      default:
        return <Navigate to="/customer/dashboard" replace />
    }
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Legacy dashboard route - redirects based on user type */}
          <Route path="/dashboard" element={getDashboardRedirect()} />

          {/* Admin Routes - Using nested routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />

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
          <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
          <Route path="/shipping/dashboard" element={<ShippingDashboardPage />} />

          {/* Customer-facing routes with Header and Footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment-success" element={<PaymentSuccessPage />} />
                  <Route path="/orders" element={<OrderSummaryPage />} />
                  <Route path="/orders/:id" element={<CustomerOrderViewPage />} />
                  <Route path="/account" element={<MyAccountPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

