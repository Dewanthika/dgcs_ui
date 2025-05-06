import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllCartItems,
  getCartDetail,
} from "../../store/selectors/cartSelector";
import {
  removeFromCart,
  updateBulkOrder,
  updateQuantity,
} from "../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProfile } from "../../store/selectors/userSelector";
import UserRoleEnum from "../../constant/userRoleEnum";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { useMemo, useState } from "react";
import ICourier from "../../types/ICourier";

const CartPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const profile = useAppSelector(getProfile);
  const cartItems = useAppSelector(getAllCartItems);
  const { isBulkOrder } = useAppSelector(getCartDetail);
  const [seletedShipping, setSelectedShipping] = useState("select");
  const dispatch = useAppDispatch();
  const { data: shipping } = useFetch<ICourier[]>({
    url: "/courier-charges",
    initialLoad: true,
  });

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item?.price ?? 0) * item.quantity,
    0
  );

  const weightKG = cartItems.reduce(
    (total, item) => total + (item.quantity * (item?.weight || 0)),
    0
  );

  const shippingAmount = useMemo(() => {
    const selectedShipping = shipping?.find(
      (s) => s.serviceCompany === seletedShipping
    );
    if (!selectedShipping) return 0;

    if (weightKG <= 1) {
      return selectedShipping.firstKGCost;
    } else {
      const extraWeight = weightKG - 1;
      return (
        selectedShipping.firstKGCost! +
        extraWeight * (selectedShipping.extraKGCost || 0)
      );
    }
  }, [seletedShipping, weightKG, shipping]);
  const discount = 0;
  const total = subtotal + shippingAmount! - discount;

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevents negative quantity
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    navigate(isAuth ? "/checkout" : "/login");
  };

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
                      <h3 className="font-medium text-lg">
                        {item.productName}
                      </h3>

                      <div className="flex items-center mt-2">
                        {isBulkOrder ? (
                          <input
                            placeholder="QTY"
                            className="px-4 py-1 border rounded-md"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(item._id!, +e.target.value)
                            }
                          />
                        ) : (
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id!,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-1"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id!,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        )}
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
                <Link
                  to="/shop"
                  className="bg-black text-white px-6 py-2 inline-block"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Right Side (1/3 width) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          {profile?.userType !== UserRoleEnum.INDIVIDUAL && (
            <div className="border rounded-md p-4 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveInformation"
                  className="mr-2"
                  checked={isBulkOrder}
                  onChange={(e) => dispatch(updateBulkOrder(e.target.checked))}
                />
                <span>Is Bulk Order</span>
              </label>
            </div>
          )}

          <div className="border-t border-b py-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Options
              </label>
              <select
                defaultValue={seletedShipping}
                onChange={(e) => setSelectedShipping(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value="select" disabled>
                  Select
                </option>
                {shipping
                  ?.filter((item) => item.status === "Active")
                  ?.map((item) => {
                    return (
                      <option
                        key={item.serviceCompany}
                        value={item.serviceCompany}
                      >
                        {item.serviceCompany}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex justify-between">
              <span>Sub-total</span>
              <span className="font-bold">LKR {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold">LKR {shippingAmount}</span>
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

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 font-medium uppercase mt-4"
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
