import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { getAllCartItems } from "../../store/selectors/cartSelector"
import { removeFromCart, updateQuantity } from "../../store/slice/cartSlice"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  imageUrl: string
}

const CartPage = () => {
  const navigate = useNavigate()
  const cartItems = useAppSelector(getAllCartItems);
  const dispatch = useAppDispatch()

  const [couponCode, setCouponCode] = useState("")

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item?.price ?? 0) * item.quantity, 0)
  const shipping = 466
  const discount = 120
  const total = subtotal + shipping - discount

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevents negative quantity
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  // const handleApplyCoupon = () => {
  //   console.log("Applying coupon:", couponCode)
  //   // Implement coupon logic
  // }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div className="container py-8 h-screen">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items - Left Side (2/3 width) */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">
            Cart{" "}
            <span className="font-normal text-gray-500">
              ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
            </span>
          </h1>

          <div className="border-t">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="py-6 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                      <img
                        src={item.imageURL || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium text-lg">{item.productName}</h3>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => handleUpdateQuantity(item._id!, item.quantity - 1)}
                            className="px-3 py-1"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item._id!, item.quantity + 1)}
                            className="px-3 py-1"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg">LKR {item.price}</div>
                      <button
                        onClick={() => handleRemoveItem(item._id!)}
                        className="text-gray-500 hover:text-black mt-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link to="/shop" className="bg-black text-white px-6 py-2 inline-block">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Right Side (1/3 width) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          <div className="border rounded-md p-4 mb-6">
            <input
              type="text"
              placeholder="Enter Discount Coupon Here"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          <div className="border-t border-b py-4 space-y-3">
            <div className="flex justify-between">
              <span>Sub-total</span>
              <span className="font-bold">LKR {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold">LKR {shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold">LKR {discount}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 text-lg font-bold">
            <span>TOTAL</span>
            <span>LKR {total}</span>
          </div>

          <button onClick={handleCheckout} className="w-full bg-black text-white py-3 font-medium uppercase mt-4">
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage

