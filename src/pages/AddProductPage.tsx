"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  LayoutGrid,
  ShoppingCart,
  Package,
  Warehouse,
  Truck,
  Building2,
  User,
  BarChart3,
  ImagePlus,
} from "lucide-react"

interface ProductFormData {
  name: string
  unitPrice: string
  category: string
  productCode: string
  description: string
  images: File[]
  isNewArrival: boolean
  isHotProduct: boolean
  originalPrice?: string
  discountPercentage?: string
  stock: string
}

const AddProductPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    unitPrice: "",
    category: "",
    productCode: "",
    description: "",
    images: [],
    isNewArrival: false,
    isHotProduct: false,
    originalPrice: "",
    discountPercentage: "",
    stock: "10",
  })

  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...filesArray] }))

      // Create preview URLs
      const newPreviewUrls = filesArray.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    // Remove image from formData
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData((prev) => ({ ...prev, images: newImages }))

    // Remove preview URL and revoke object URL to free memory
    URL.revokeObjectURL(previewUrls[index])
    const newPreviewUrls = [...previewUrls]
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your API
    console.log("Submitting product:", formData)

    // For demo purposes, we'll create a product object and store it in localStorage
    const newProduct = {
      id: Date.now(),
      title: formData.name,
      price: Number.parseFloat(formData.unitPrice),
      originalPrice: formData.isHotProduct ? Number.parseFloat(formData.originalPrice || "0") : undefined,
      discountPercentage: formData.isHotProduct ? Number.parseInt(formData.discountPercentage || "0") : undefined,
      category: formData.category,
      productCode: formData.productCode,
      description: formData.description,
      imageUrl: previewUrls.length > 0 ? previewUrls[0] : "/placeholder.svg?height=200&width=200",
      isNewArrival: formData.isNewArrival,
      isHotProduct: formData.isHotProduct,
      stock: Number.parseInt(formData.stock),
    }

    // Get existing products from localStorage or initialize empty array
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]")

    // Add new product
    const updatedProducts = [...existingProducts, newProduct]

    // Save back to localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    // Show success message
    alert("Product added successfully!")

    // Redirect to products list
    navigate("/admin/products")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Logo</h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <LayoutGrid className="w-5 h-5 mr-3" />
            Dashboard
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </div>

          <div className="px-4 py-3 bg-indigo-50 flex items-center text-indigo-700 font-medium">
            <Package className="w-5 h-5 mr-3" />
            Product
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Warehouse className="w-5 h-5 mr-3" />
            Inventory
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Truck className="w-5 h-5 mr-3" />
            Shipping
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <Building2 className="w-5 h-5 mr-3" />
            Company
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <User className="w-5 h-5 mr-3" />
            User
          </div>

          <div className="px-4 py-3 flex items-center text-gray-700 hover:bg-gray-100">
            <BarChart3 className="w-5 h-5 mr-3" />
            Report
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 border-t p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img src="/placeholder.svg?height=40&width=40" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="unitPrice" className="block mb-2 text-sm font-medium text-gray-700">
                Unit Price
              </label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Kitchen</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
              </select>
            </div>

            <div>
              <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-700">
                Product Code
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                value={formData.productCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex items-center space-x-6 pt-7">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNewArrival"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isNewArrival" className="ml-2 block text-sm text-gray-700">
                  New Arrival
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isHotProduct"
                  name="isHotProduct"
                  checked={formData.isHotProduct}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isHotProduct" className="ml-2 block text-sm text-gray-700">
                  Hot Product
                </label>
              </div>
            </div>
          </div>

          {formData.isHotProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="originalPrice" className="block mb-2 text-sm font-medium text-gray-700">
                  Original Price
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={formData.isHotProduct}
                />
              </div>

              <div>
                <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={formData.isHotProduct}
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                multiple
              />
              <ImagePlus className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Choose product images</p>
              <p className="text-xs text-gray-400">Click to browse or drag and drop</p>
            </div>

            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      className="h-24 w-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveImage(index)
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductPage

