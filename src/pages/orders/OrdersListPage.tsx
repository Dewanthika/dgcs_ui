"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import type { Order } from "../../types"
import PageHeader from "../../components/ui/PageHeader"
import SearchBar from "../../components/ui/SearchBar"
import DataTable from "../../components/tables/DataTable"
import StatusBadge from "../../components/ui/StatusBadge"
import ActionButtons from "../../components/ui/ActionButtons"

const OrdersListPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    // Load mock orders data
    const mockOrders: Order[] = [
      {
        id: 1,
        orderID: "ORD001",
        userID: "USR002",
        customerName: "John Doe",
        contact: "+94 234 567 890",
        deliveryAddress: "456 Customer Ave, Kandy, Central Province, 20000",
        orderWeight: 2.5,
        deliveryCharge: 350,
        orderType: "Standard",
        paymentMethod: "Credit Card",
        orderStatus: "Processing",
        totalAmount: 2850,
        orderDate: "2023-07-15",
        orderItems: [
          {
            orderItemID: "ITEM001",
            productID: 101,
            productName: "Smartphone X",
            quantity: 1,
            price: 799,
          },
          {
            orderItemID: "ITEM002",
            productID: 103,
            productName: "Wireless Headphones",
            quantity: 1,
            price: 149,
          },
        ],
      },
      {
        id: 2,
        orderID: "ORD002",
        userID: "USR003",
        customerName: "Jane Smith",
        contact: "+94 345 678 901",
        deliveryAddress: "789 User Blvd, Galle",
        orderWeight: 1.2,
        deliveryCharge: 250,
        orderType: "Express",
        paymentMethod: "Cash on Delivery",
        orderStatus: "Shipped",
        totalAmount: 1549,
        orderDate: "2023-07-14",
        orderItems: [
          {
            orderItemID: "ITEM003",
            productID: 104,
            productName: "Smart Watch",
            quantity: 1,
            price: 249,
          },
          {
            orderItemID: "ITEM004",
            productID: 105,
            productName: "Bluetooth Speaker",
            quantity: 1,
            price: 99,
          },
        ],
      },
      {
        id: 3,
        orderID: "ORD003",
        userID: "USR002",
        customerName: "John Doe",
        contact: "+94 234 567 890",
        deliveryAddress: "456 Customer Ave, Kandy, Central Province, 20000",
        orderWeight: 3.8,
        deliveryCharge: 450,
        orderType: "Standard",
        paymentMethod: "Credit Card",
        orderStatus: "Delivered",
        totalAmount: 1749,
        orderDate: "2023-07-10",
        orderItems: [
          {
            orderItemID: "ITEM005",
            productID: 102,
            productName: "Laptop Pro",
            quantity: 1,
            price: 1299,
          },
        ],
      },
      {
        id: 4,
        orderID: "ORD004",
        userID: "USR006",
        customerName: "New Customer",
        contact: "+94 678 901 234",
        deliveryAddress: "303 New User St, Matara",
        orderWeight: 0.5,
        deliveryCharge: 150,
        orderType: "Express",
        paymentMethod: "PayPal",
        orderStatus: "Cancelled",
        totalAmount: 249,
        orderDate: "2023-07-12",
        orderItems: [
          {
            orderItemID: "ITEM006",
            productID: 104,
            productName: "Smart Watch",
            quantity: 1,
            price: 249,
          },
        ],
      },
    ]

    setOrders(mockOrders)
  }, [])

  const handleDeleteOrder = (id: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id))
    }
  }

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.orderStatus.toLowerCase() === selectedStatus.toLowerCase()
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Get unique statuses from orders
  const statuses = ["all", ...new Set(orders.map((order) => order.orderStatus.toLowerCase()))]

  const columns = [
    { header: "Order ID", accessor: "orderID" },
    {
      header: "Customer",
      accessor: (order: Order) => (
        <div>
          <div>{order.customerName}</div>
          <div className="text-xs text-gray-500">{order.contact}</div>
        </div>
      ),
    },
    { header: "Date", accessor: "orderDate" },
    {
      header: "Total",
      accessor: (order: Order) => `LKR ${order.totalAmount.toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: (order: Order) => <StatusBadge status={order.orderStatus} type="order" />,
    },
    { header: "Payment", accessor: "paymentMethod" },
    { header: "Type", accessor: "orderType" },
    {
      header: "Actions",
      accessor: (order: Order) => (
        <ActionButtons
          viewPath={`/admin/orders/${order.id}/view`}
          editPath={`/admin/orders/${order.id}/edit`}
          onDelete={() => handleDeleteOrder(order.id)}
        />
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Orders"
        action={
          <Link
            to="/admin/orders/create"
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
            placeholder="Search orders by customer name, contact, or order ID..."
          />

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          keyExtractor={(order) => order.id}
          emptyMessage={
            searchTerm || selectedStatus !== "all"
              ? "No orders found. Try changing your filters."
              : "No orders found. Create some orders to get started."
          }
        />
      </div>
    </>
  )
}

export default OrdersListPage

