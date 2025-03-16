"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"

interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
}

interface Category {
  id: number
  name: string
  count: number
  checked: boolean
}

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Tag", count: 8, checked: false },
    { id: 2, name: "Tag", count: 2, checked: false },
  ])
  const [showCategories, setShowCategories] = useState(true)

  // Sample products data
  const products: Product[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: "Product Title",
    price: 9999,
    imageUrl: "/placeholder.svg?height=200&width=200",
  }))

  const handleCategoryChange = (categoryId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, checked: !category.checked } : category,
      ),
    )
  }

  const clearAllFilters = () => {
    setCategories(categories.map((category) => ({ ...category, checked: false })))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    // Implement search functionality
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex max-w-xl">
          <label htmlFor="search" className="flex items-center mr-2 font-medium">
            Search Products
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="w-full md:w-64 shrink-0">
          <button onClick={clearAllFilters} className="text-blue-500 hover:underline mb-4">
            Clear all
          </button>

          <div className="border-b pb-4 mb-4">
            <button
              className="flex items-center justify-between w-full font-bold mb-4"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories
              <ChevronDown size={20} className={`transition-transform ${showCategories ? "rotate-180" : ""}`} />
            </button>

            {showCategories && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={category.checked}
                      onChange={() => handleCategoryChange(category.id)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor={`category-${category.id}`} className="flex-1">
                      {category.name} ({category.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard id={product.id} title={product.title} price={product.price} imageUrl={product.imageUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage

