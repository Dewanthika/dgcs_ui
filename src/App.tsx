import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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

function App() {
  // In a real app, you would determine user type from authentication
  const userType = "shipping" // Options: 'admin', 'customer', 'vendor', 'shipping'

  // Function to render the appropriate dashboard based on user type
  const renderDashboard = () => {
    switch (userType) {
      case "admin":
        return <AdminDashboardPage />
      case "customer":
        return <CustomerDashboardPage />
      case "vendor":
        return <VendorDashboardPage />
      case "shipping":
        return <ShippingDashboardPage />
      default:
        return <CustomerDashboardPage />
    }
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={renderDashboard()} />
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

