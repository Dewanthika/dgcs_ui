"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { ProductFormData } from "../../types"
import FormField from "../../components/ui/FormField"
import { ImagePlus } from "lucide-react"

interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData, previewUrls: string[]) => void
  onCancel: () => void
}

const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!initialData

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
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
    },
  )

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
    onSubmit(formData, previewUrls)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Product Name" id="productName" required>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>

        <FormField label="Price" id="price" required>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Category" id="categoryID" required>
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
        </FormField>

        <FormField label="Weight (kg)" id="weight" required>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Initial Stock" id="stock" required>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>

        <FormField label="Creation Date" id="createdAt" required>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <FormField label="Product Images" id="images">
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
      </FormField>

      <FormField label="Description" id="productDescription" required>
        <textarea
          id="productDescription"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleInputChange}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </FormField>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {isEditing ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  )
}

export default ProductForm

