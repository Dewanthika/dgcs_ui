import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import useGetAllOrders from "../../hooks/useGetAllOrders";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import ActionButtons from "../../components/ui/ActionButtons";
import type IOrder from "../../types/IOrder";

const OrdersListPage = () => {
  const orders = useGetAllOrders();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Orders loaded in OrdersListPage:", orders);
  }, [orders]);

  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      console.log("Delete requested for order:", id);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" ||
      order.orderStatus?.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      order.userID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress?.street?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ["all", ...new Set(orders.map((o) => o.orderStatus?.toLowerCase()))];

  const columns = [
    { header: "Order ID", accessor: (order: IOrder) => order._id?.slice(-6).toUpperCase() },
    {
      header: "Address",
      accessor: (order: IOrder) => (
        <div className="text-sm">
          {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
          <div className="text-xs text-gray-500">
            {order.deliveryAddress?.state}, {order.deliveryAddress?.zip}
          </div>
        </div>
      ),
    },
    { header: "Date", accessor: (order: IOrder) => new Date(order.orderDate).toLocaleDateString() },
    {
      header: "Total",
      accessor: (order: IOrder) => `LKR ${order.totalAmount?.toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: (order: IOrder) => (
        <StatusBadge status={order.orderStatus} type="order" />
      ),
    },
    { header: "Payment", accessor: (order: IOrder) => order.paymentMethod },
    { header: "Type", accessor: (order: IOrder) => order.orderType },
    {
      header: "Actions",
      accessor: (order: IOrder) => (
        <ActionButtons
          viewPath={`/dashboard/orders/${order._id}/view`}
          editPath={`/dashboard/orders/${order._id}/edit`}
          onDelete={() => handleDeleteOrder(order._id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Orders"
        action={
          <Link
            to="/dashboard/orders/create"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-1" />
            Create Order
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search orders by user ID or address..."
          />
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          keyExtractor={(order) => order._id}
          emptyMessage={
            searchTerm || selectedStatus !== "all"
              ? "No orders found. Try changing your filters."
              : "No orders found. Create some orders to get started."
          }
        />
      </div>
    </>
  );
};

export default OrdersListPage;
