import { Minus, Plus, Trash2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import FormField from "../../components/ui/FormField";
import UserRoleEnum from "../../constant/userRoleEnum";
import {
  getAllCartItems,
  getCartDetail,
} from "../../store/selectors/cartSelector";
import { getProfile } from "../../store/selectors/userSelector";
import {
  removeFromCart,
  updateCreditOrder,
  updateQuantity,
} from "../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import appFetch from "../../utils/appFetch";

const socket = io(`${import.meta.env.VITE_API_URL}/order`, {
  withCredentials: true,
});

// Define the FormData type with deliveryAddress
interface FormData {
  deliveryAddress: {
    city: string;
    state: string;
    street: string;
    zip: string;
  };
  email: string;
  isBulkOrder: boolean;
  isCredit: boolean;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const profile = useAppSelector(getProfile);

  const cartItems = useAppSelector(getAllCartItems);
  const { isBulkOrder, isCredit } = useAppSelector(getCartDetail);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );
  const shipping = 400;
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevents negative quantity
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const orderWeight = cartItems.reduce(
      (total, item) => total + (item.weight || 0) * item.quantity,
      0
    );

    const formData = {
      orderDate: new Date(),
      userID: profile?._id || "",
      items: cartItems
        .filter((item) => item._id)
        .map((item) => ({
          product: item._id as string,
          quantity: item.quantity,
          unitPrice: item.price ?? 0,
        })),
      orderType: "instore",
      deliveryAddress: {
        city: data.deliveryAddress.city,
        state: data.deliveryAddress.state,
        street: data.deliveryAddress.street,
        zip: data.deliveryAddress.zip,
      },
      isApproved: false,
      isBulkOrder,
      isCredit,
      orderWeight,
      deliveryCharge: 0,
      orderStatus: "",
      totalAmount: total,
      paymentMethod: "",
    };

    try {
      // 1. Create checkout session
      if (isCredit) {
        socket.emit("createOrder", formData);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return;
      }
      const checkoutSession = await appFetch<{ url: string }>({
        url: "/orders/checkout-session",
        method: "post",
        data: {
          items: cartItems.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.price,
            product: item._id,
          })),
          customerEmail: profile?.email,
          formData: {
            ...data,
            isBulkOrder,
            isCredit,
          },
        },
      });

      // 2. Redirect to Stripe Checkout
      window.location.href = checkoutSession.url;
      return;
    } catch (error) {
      console.error("Checkout Error:", error);
    }

    return;
  };

  const handleReturnToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left Column - Checkout Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Contact Information */}

            {/* Shipping Address */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Shipping address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField label="Email" id="email" required>
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </FormField>
                <FormField label="City" id="city" required>
                  <input
                    {...register("deliveryAddress.city", {
                      required: "City is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.deliveryAddress?.city && (
                    <p className="text-red-500">
                      {errors.deliveryAddress?.city.message}
                    </p>
                  )}
                </FormField>
                <FormField label="State" id="state" required>
                  <input
                    {...register("deliveryAddress.state", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.deliveryAddress?.state && (
                    <p className="text-red-500">
                      {errors.deliveryAddress?.state.message}
                    </p>
                  )}
                </FormField>
                <FormField label="Street" id="street" required>
                  <input
                    {...register("deliveryAddress.street", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.deliveryAddress?.street && (
                    <p className="text-red-500">
                      {errors.deliveryAddress?.street.message}
                    </p>
                  )}
                </FormField>
                <FormField label="Zip Code" id="zip" required>
                  <input
                    {...register("deliveryAddress.zip", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.deliveryAddress?.zip && (
                    <p className="text-red-500">
                      {errors.deliveryAddress?.zip.message}
                    </p>
                  )}
                </FormField>
              </div>
            </div>

            {/* Save Information Checkbox */}
            {profile?.userType !== UserRoleEnum.INDIVIDUAL && (
              <div className="mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isCredit"
                    checked={isCredit}
                    onChange={(e) =>
                      dispatch(updateCreditOrder(e.target.checked))
                    }
                    className="mr-2"
                  />
                  <span>Make this Credit Purchase</span>
                </label>
              </div>
            )}

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
                      {isBulkOrder ? (
                        <input
                          placeholder="QTY"
                          className="px-4 py-1 border rounded-md"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item._id!, +e.target.value)
                          }
                        />
                      ) : (
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
                      )}
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
