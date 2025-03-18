"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ImagePlus } from "lucide-react"

interface ProductFormData {
  productName: string
  price: string
  categoryID: string
  productID: string
  productDescription: string
  images: File[]
  weight: string
  createdAt: string
  uploadedAt: string
  stock: string
}

const AddProductPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    price: "",
    categoryID: "",
    productID: "",
    productDescription: "",
    images: [],
    weight: "",
    createdAt: new Date().toISOString().split("T")[0],
    uploadedAt: new Date().toISOString().split("T")[0],
    stock: "10",
  })

  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      productID: `PROD${Math.floor(1000 + Math.random() * 9000)}`,
      productName: formData.productName,
      price: Number.parseFloat(formData.price),
      categoryID: formData.categoryID,
      productDescription: formData.productDescription,
      imageUrl: previewUrls.length > 0 ? previewUrls[0] : "/placeholder.svg?height=200&width=200",
      weight: Number.parseFloat(formData.weight),
      createdAt: formData.createdAt,
      uploadedAt: formData.uploadedAt,
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
    <>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="categoryID" className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="categoryID"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Clothing</option>
              <option value="3">Home & Kitchen</option>
              <option value="4">Books</option>
              <option value="5">Toys</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-700">
              Initial Stock
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

          <div>
            <label htmlFor="createdAt" className="block mb-2 text-sm font-medium text-gray-700">
              Creation Date
            </label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Product Images</label>
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
          <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
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
    </>
  )
}

export default AddProductPage

