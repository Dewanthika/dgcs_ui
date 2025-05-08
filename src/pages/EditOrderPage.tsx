import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useOrderWebSocket } from "../hooks/useOrderWebSocket";
import useGetAllProduct from "../hooks/useGetAllProduct";
import IProduct from "../types/IProduct";

interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
}

interface OrderFormData {
  customerName: string;
  contact: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  paymentDate: string;
  paymentStatus: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
  trackingLink?: string;
}

const EditOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Partial<IProduct>[]>([]);
  // const [loading, setLoading] = useState(true);

  const orderData = useOrderWebSocket({ id });
  const allProducts = useGetAllProduct();

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    paymentDate: "",
    paymentStatus: "Pending",
    items: [{ productId: "", productTitle: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    orderStatus: "Processing",
    orderDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Transform products to match our Product interface
        const transformedProducts = allProducts.map((product) => ({
          // _id: product._id.toString(),
          productName: product.productName || "",
          price: product.price || 0,
          stock: product.stock || 0,
        }));
        setProducts(transformedProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    loadProducts();
  }, [allProducts]);

  useEffect(() => {
    if (orderData) {
      setFormData({
        customerName: `${orderData.userID?.fName || ""} ${
          orderData.userID?.lName || ""
        }`,
        contact: orderData.userID?.phone || "",
        email: orderData.userID?.email || "",
        address: orderData.deliveryAddress?.street || "",
        city: orderData.deliveryAddress?.city || "",
        district: orderData.deliveryAddress?.state || "",
        postalCode: orderData.deliveryAddress?.zip || "",
        paymentDate: orderData.paymentDate?.split("T")[0] || "",
        paymentStatus: orderData.paymentStatus || "Pending",
        items: orderData.items.map((item: any) => ({
          productId: item.product?._id || "",
          productTitle: item.product?.title || "",
          quantity: item.quantity,
          price: item.unitPrice,
        })),
        totalAmount: orderData.totalAmount || 0,
        orderStatus: orderData.orderStatus || "Processing",
        orderDate:
          orderData.orderDate?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
      });
      // setLoading(false);
    }
  }, [orderData]);

  useEffect(() => {
    const total = formData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.items]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const productId = e.target.value;
    const selectedProduct = products.find((p) => p._id === productId);
    if (!selectedProduct) return;

    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      productId,
      productTitle: selectedProduct.productName || "",
      price: selectedProduct.price || 0,
    };
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleQuantityChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = Number(e.target.value);
    if (quantity < 1) return;

    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], quantity };
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { productId: "", productTitle: "", quantity: 1, price: 0 },
      ],
    }));
  };

  const removeProductRow = (index: number) => {
    if (formData.items.length === 1) return;
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order updated successfully!");
    navigate("/dashboard/orders");
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <p>Loading order data...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <p className="text-red-500">Error: {error}</p>
  //     </div>
  //   );
  // }

  console.log({ products });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Order</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Customer Information */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="customerName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Customer name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {formData.orderStatus === "Shipped" && (
            <div>
              <label
                htmlFor="trackingLink"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Tracking Link
              </label>
              <input
                type="text"
                id="trackingLink"
                name="trackingLink"
                value={formData.trackingLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="orderStatus"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Order Status
            </label>
            <select
              id="orderStatus"
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="paymentDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Payment Date
            </label>
            <input
              type="date"
              id="paymentDate"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="paymentStatus"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Payment Status
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Order Items</h2>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1">
                  <label
                    className={
                      index === 0
                        ? "block mb-2 text-sm font-medium text-gray-700"
                        : "sr-only"
                    }
                  >
                    Product Title
                  </label>
                  <select
                    defaultValue={item.productTitle || ""}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.productName} - ({product.stock || 0} in stock)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-32">
                  <label
                    className={
                      index === 0
                        ? "block mb-2 text-sm font-medium text-gray-700"
                        : "sr-only"
                    }
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addProductRow}
                      className="p-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200"
                      title="Add product"
                    >
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeProductRow(index)}
                      className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                      title="Remove product"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between font-medium">
              <span>Total Amount:</span>
              <span>LKR {formData.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/orders")}
              className="mr-4 bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Order
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditOrderPage;
