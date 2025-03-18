import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Minus } from "lucide-react"
import { getAllProducts } from "../services/productService"

interface Product {
  id: number
  title: string
  price: number
  stock: number
}

interface OrderItem {
  productId: number
  productTitle: string
  quantity: number
  price: number
}

interface OrderFormData {
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
}

const CreateOrderPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])

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
    items: [{ productId: 0, productTitle: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    orderStatus: "Processing",
    orderDate: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    // Load products from our service
    const loadedProducts = getAllProducts()
    setProducts(loadedProducts)
  }, [])

  useEffect(() => {
    // Calculate total amount whenever items change
    const total = formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setFormData((prev) => ({ ...prev, totalAmount: total }))
  }, [formData.items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = Number(e.target.value)
    const selectedProduct = products.find((p) => p.id === productId)

    if (selectedProduct) {
      const updatedItems = [...formData.items]
      updatedItems[index] = {
        ...updatedItems[index],
        productId,
        productTitle: selectedProduct.title,
        price: selectedProduct.price,
      }

      setFormData((prev) => ({ ...prev, items: updatedItems }))
    }
  }

  const handleQuantityChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value)
    if (quantity < 1) return

    const updatedItems = [...formData.items]
    updatedItems[index] = { ...updatedItems[index], quantity }

    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: 0, productTitle: "", quantity: 1, price: 0 }],
    }))
  }

  const removeProductRow = (index: number) => {
    if (formData.items.length === 1) return

    const updatedItems = [...formData.items]
    updatedItems.splice(index, 1)

    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.customerName || !formData.contact || !formData.address) {
      alert("Please fill in all required fields")
      return
    }

    if (formData.items.some((item) => item.productId === 0)) {
      alert("Please select products for all items")
      return
    }

    // Create order object
    const newOrder = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }

    // Get existing orders from localStorage or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    // Add new order
    const updatedOrders = [...existingOrders, newOrder]

    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    // Show success message
    alert("Order created successfully!")

    // Redirect to orders list
    navigate("/admin/orders")
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create Order</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <div>
            <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-700">
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

          <div>
            <label htmlFor="paymentDate" className="block mb-2 text-sm font-medium text-gray-700">
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
            <label htmlFor="paymentStatus" className="block mb-2 text-sm font-medium text-gray-700">
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
                  <label className={index === 0 ? "block mb-2 text-sm font-medium text-gray-700" : "sr-only"}>
                    Product Title
                  </label>
                  <select
                    value={item.productId}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title} - LKR {product.price} ({product.stock} in stock)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-32">
                  <label className={index === 0 ? "block mb-2 text-sm font-medium text-gray-700" : "sr-only"}>
                    Product Quantity
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
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateOrderPage

