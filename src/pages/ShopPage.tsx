"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { getAllProducts } from "../services/productService"

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  category: string
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
  const [categories, setCategories] = useState<Category[]>([])
  const [showCategories, setShowCategories] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load products from our service
    const allProducts = getAllProducts()
    setProducts(allProducts)

    // Generate categories from products
    const categoryMap = new Map<string, number>()

    allProducts.forEach((product) => {
      const count = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, count + 1)
    })

    const categoryList: Category[] = Array.from(categoryMap).map(([name, count], index) => ({
      id: index + 1,
      name,
      count,
      checked: false,
    }))

    setCategories(categoryList)
  }, [])

  const handleCategoryChange = (categoryId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, checked: !category.checked } : category,
      ),
    )
  }

  const clearAllFilters = () => {
    setCategories(categories.map((category) => ({ ...category, checked: false })))
    setSearchTerm("")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    // Implement search functionality
  }

  // Filter products based on selected categories and search term
  const filteredProducts = products.filter((product) => {
    // Check if any category is selected
    const selectedCategories = categories.filter((cat) => cat.checked).map((cat) => cat.name)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    // Check if product matches search term
    const matchesSearch = searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discountPercentage={product.discountPercentage}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage

