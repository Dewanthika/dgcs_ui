import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllCartItems } from "../../store/selectors/cartSelector";
import { removeFromCart, updateQuantity } from "../../store/slice/cartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    saveInformation: false,
  });

  const cartItems = useAppSelector(getAllCartItems);
  const dispatch = useAppDispatch();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );
  const shipping = 300;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevents negative quantity
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout form submitted:", formData);
    console.log("Cart items:", cartItems);
    // In a real app, you would process the payment here
    // For now, we'll just navigate to the success page
    navigate("/payment-success");
  };

  const handleReturnToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left Column - Checkout Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Contact information</h2>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Shipping address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleSelectChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 appearance-none focus:outline-none focus:border-black"
                      required
                    >
                      <option value="" disabled>
                        State
                      </option>
                      <option value="central">Central</option>
                      <option value="eastern">Eastern</option>
                      <option value="north-central">North Central</option>
                      <option value="northern">Northern</option>
                      <option value="north-western">North Western</option>
                      <option value="sabaragamuwa">Sabaragamuwa</option>
                      <option value="southern">Southern</option>
                      <option value="uva">Uva</option>
                      <option value="western">Western</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-500" />
                  </div>

                  <div className="relative">
                    <select
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleSelectChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 appearance-none focus:outline-none focus:border-black"
                      required
                    >
                      <option value="" disabled>
                        Postal code
                      </option>
                      <option value="10000">10000 - Colombo</option>
                      <option value="20000">20000 - Gampaha</option>
                      <option value="30000">30000 - Kalutara</option>
                      <option value="40000">40000 - Kandy</option>
                      <option value="50000">50000 - Matale</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-500" />
                  </div>
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Save Information Checkbox */}
            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveInformation"
                  checked={formData.saveInformation}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Save this information</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReturnToCart}
                className="border border-gray-300 px-6 py-2 uppercase text-sm font-medium"
              >
                Return to cart
              </button>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 uppercase text-sm font-medium"
              >
                Continue to shipping
              </button>
            </div>
          </form>

          {/* Policy Links */}
          <div className="mt-16 pt-6 border-t flex gap-6 text-sm text-gray-500">
            <Link to="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
            <Link to="/shipping-policy" className="hover:underline">
              Shipping Policy
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-2">
          <div className="border rounded-md p-6">
            {/* Cart Items */}
            <div className="space-y-6 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    <img
                      src={item.imageURL || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium">{item.productName}</h3>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item._id!, item.quantity - 1)
                          }
                          className="px-2 py-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-0.5">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item._id!, item.quantity + 1)
                          }
                          className="px-2 py-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold">LKR {item.price}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item._id!)}
                      className="text-gray-500 hover:text-black mt-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">LKR {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">LKR {shipping}</span>
              </div>

              <div className="flex justify-between pt-3 border-t text-lg font-bold">
                <span>Total:</span>
                <span>LKR {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
