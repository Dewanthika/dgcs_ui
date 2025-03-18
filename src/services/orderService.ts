interface OrderItem {
    productId: number
    productTitle: string
    quantity: number
    price: number
  }
  
  export interface Order {
    id: number
    customerName: string
    contact: string
    email: string
    address: string
    city: string
    district: string
    postalCode: string
    paymentDate: string
    paymentStatus: string
    items: OrderItem[]
    totalAmount: number
    orderStatus: string
    orderDate: string
    createdAt: string
    updatedAt?: string
  }
  
  // Get all orders from localStorage
  export const getAllOrders = (): Order[] => {
    const orders = localStorage.getItem("orders")
    return orders ? JSON.parse(orders) : []
  }
  
  // Get order by ID
  export const getOrderById = (id: number): Order | null => {
    const orders = getAllOrders()
    return orders.find((order) => order.id === id) || null
  }
  
  // Add a new order
  export const addOrder = (order: Omit<Order, "id" | "createdAt">): Order => {
    const orders = getAllOrders()
    const newOrder = {
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
  
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]))
    return newOrder
  }
  
  // Update an order
  export const updateOrder = (id: number, updatedOrder: Omit<Order, "id" | "createdAt">): boolean => {
    const orders = getAllOrders()
    const index = orders.findIndex((order) => order.id === id)
  
    if (index === -1) return false
  
    const updatedOrders = [...orders]
    updatedOrders[index] = {
      ...updatedOrder,
      id,
      createdAt: orders[index].createdAt,
      updatedAt: new Date().toISOString(),
    }
  
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    return true
  }
  
  // Delete an order
  export const deleteOrder = (id: number): boolean => {
    const orders = getAllOrders()
    const updatedOrders = orders.filter((order) => order.id !== id)
  
    if (updatedOrders.length === orders.length) return false
  
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    return true
  }
  
  // Get orders by customer
  export const getOrdersByCustomer = (customerName: string): Order[] => {
    const orders = getAllOrders()
    return orders.filter((order) => order.customerName.toLowerCase().includes(customerName.toLowerCase()))
  }
  
  // Get orders by status
  export const getOrdersByStatus = (status: string): Order[] => {
    const orders = getAllOrders()
    return orders.filter((order) => order.orderStatus === status)
  }
  
  