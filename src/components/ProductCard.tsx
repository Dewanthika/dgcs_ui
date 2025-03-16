"use client"

import type React from "react"

import { Link } from "react-router-dom"

interface ProductCardProps {
  id: number
  title: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  imageUrl: string
}

const ProductCard = ({ id, title, price, originalPrice, discountPercentage, imageUrl }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation() // Stop event propagation
    console.log(`Added product ${id} to cart`)
    // Implement add to cart functionality
  }

  return (
    <div className="bg-white rounded overflow-hidden shadow-sm transition-transform hover:shadow-md hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block h-48 bg-gray-200 flex items-center justify-center">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="max-h-full object-contain" />
      </Link>
      <div className="p-4 space-y-3">
        <Link to={`/product/${id}`} className="font-medium hover:underline">
          {title}
        </Link>
        <p className="text-sm text-muted">Product Description</p>
        <div>
          {originalPrice ? (
            <div className="space-y-1">
              <div className="font-bold">Now LKR {price}</div>
              <div className="text-xs text-gray-500 line-through">Was LKR {originalPrice}</div>
              {discountPercentage && <span className="text-xs text-danger font-medium">(-{discountPercentage}%)</span>}
            </div>
          ) : (
            <div className="font-bold">LKR {price}</div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard

