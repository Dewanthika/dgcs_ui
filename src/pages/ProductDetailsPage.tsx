"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Star, Minus, Plus } from "lucide-react"

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  // In a real app, you would fetch product data based on the ID
  // This is mock data for demonstration
  const product = {
    id: Number(id),
    title: "Product Title",
    price: 895,
    rating: 4.0,
    description: "Product description",
    imageUrl: "/placeholder.svg?height=600&width=600",
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${id} to cart`)
    // Implement add to cart functionality
  }

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 half-filled" />)
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <div className="text-2xl font-bold">LKR {product.price}</div>

          <div className="flex items-center gap-2">
            <span className="font-medium">{product.rating}</span>
            <div className="flex">{renderStars(product.rating)}</div>
          </div>

          <div className="space-y-2 border-t pt-6">
            <h2 className="font-bold text-lg">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center border rounded-md">
              <button onClick={handleDecreaseQuantity} className="px-4 py-2 border-r" aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button onClick={handleIncreaseQuantity} className="px-4 py-2 border-l" aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

