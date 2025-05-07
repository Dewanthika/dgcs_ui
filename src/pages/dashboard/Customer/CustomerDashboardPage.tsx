import { useState } from "react";
import useGetUserOrders from "../../../hooks/useGetUserOrders";
import IOrder, { IOrderItem } from "../../../types/IOrder"; // Adjust path as needed

interface Product {
  productName: string;
  [key: string]: any;
}

const CustomerDashboardPage = () => {
  const [activeTab] = useState("orders");
  const { orders } = useGetUserOrders();
  const [selectedOrder, setSelectedOrder] = useState<IOrder & { trackingLink?: string } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (order: IOrder & { trackingLink?: string }) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          {activeTab === "orders" && (
            <div className="bg-white rounded shadow overflow-hidden border">
              <div className="p-4 border-b bg-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-800">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Total</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order: IOrder & { trackingLink?: string }) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">#{order._id.slice(18).toUpperCase()}</td>
                        <td className="px-4 py-3">{new Date(order.orderDate || "").toDateString()}</td>
                        <td className="px-4 py-3">LKR {order.totalAmount}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.orderStatus === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => openModal(order)} className="text-blue-600 hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 relative border">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p><span className="font-semibold">Order ID:</span> #{selectedOrder._id.slice(18).toUpperCase()}</p>
              <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.orderDate).toDateString()}</p>
              <p><span className="font-semibold">Total:</span> LKR {selectedOrder.totalAmount}</p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className={`px-2 py-1 rounded text-xs ${
                  selectedOrder.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : selectedOrder.orderStatus === "Processing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedOrder.orderStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold">Tracking:</span>{" "}
                {selectedOrder.trackingLink ? (
                  <a href={selectedOrder.trackingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Track Order
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
              <div>
                <p className="font-semibold">Items:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {selectedOrder.items?.map((item: IOrderItem, index: number) => {
                    const product = item.product as Product | string;
                    const name = typeof product === 'object' && 'productName' in product ? product.productName : String(product);
                    return (
                      <li key={index}>
                        {name} - {item.quantity} × LKR {item.unitPrice}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboardPage;
