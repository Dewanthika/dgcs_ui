import { useNavigate } from "react-router-dom"
import type { ProductFormData } from "../../types"
import PageHeader from "../../components/ui/PageHeader"
import ProductForm from "../../features/products/ProductForm"

const AddProductPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (formData: ProductFormData, previewUrls: string[]) => {
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
      <PageHeader title="Add Product" />

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <ProductForm onSubmit={handleSubmit} onCancel={() => navigate("/admin/products")} />
      </div>
    </>
  )
}

export default AddProductPage

