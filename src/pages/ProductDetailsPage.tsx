import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, Minus, Plus } from "lucide-react"
import { getProductById } from "../services/productService"

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  category: string
  description: string
  imageUrl: string
  stock: number
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const productData = getProductById(Number(id))
      if (productData) {
        setProduct({
          ...productData,
          // Add a default rating for display purposes
          rating: 4.0,
        } as Product & { rating: number })
      }
      setLoading(false)
    }
  }, [id])

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    console.log(`Added ${quantity} of product ${id} to cart`)
    // Implement add to cart functionality

    // For demo purposes, we'll show an alert
    alert(`Added ${quantity} of ${product.title} to cart`)
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

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <p>Product not found</p>
      </div>
    )
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

          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through">LKR {product.originalPrice}</span>
              {product.discountPercentage && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-medium">{(product as any).rating || 4.0}</span>
            <div className="flex">{renderStars((product as any).rating || 4.0)}</div>
          </div>

          <div className="space-y-2 border-t pt-6">
            <h2 className="font-bold text-lg">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-lg">Category</h2>
            <p className="text-gray-700">{product.category}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-lg">Availability</h2>
            <p className={`${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={handleDecreaseQuantity}
                className="px-4 py-2 border-r"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-4 py-2 border-l"
                aria-label="Increase quantity"
                disabled={product.stock <= quantity}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              disabled={product.stock <= 0}
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

