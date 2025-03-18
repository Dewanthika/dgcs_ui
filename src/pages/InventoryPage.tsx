import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, AlertTriangle, ArrowUpDown } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  category: string
  productCode: string
  stock: number
  imageUrl: string
}

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortField, setSortField] = useState<string>("stock")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [stockFilter, setStockFilter] = useState<string>("all")

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Apply search filter
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply stock filter
      const matchesStockFilter =
        stockFilter === "all" ||
        (stockFilter === "low" && product.stock <= 5) ||
        (stockFilter === "out" && product.stock === 0) ||
        (stockFilter === "in" && product.stock > 5)

      return matchesSearch && matchesStockFilter
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "title") {
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortField === "stock") {
        return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      }
      return 0
    })

  const updateStock = (id: number, newStock: number) => {
    if (newStock < 0) return

    const updatedProducts = products.map((product) => (product.id === id ? { ...product, stock: newStock } : product))

    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Link
          to="/admin/products/add"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Stock</option>
              <option value="low">Low Stock (≤ 5)</option>
              <option value="out">Out of Stock</option>
              <option value="in">In Stock (&gt; 5)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("title")}>
                    Product
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("price")}>
                    Price
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  <button className="flex items-center" onClick={() => handleSort("stock")}>
                    Stock
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 ${product.stock === 0 ? "bg-red-50" : product.stock <= 5 ? "bg-yellow-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{product.title}</td>
                    <td className="px-4 py-3 text-sm">{product.productCode}</td>
                    <td className="px-4 py-3 text-sm">{product.category}</td>
                    <td className="px-4 py-3 text-sm">LKR {product.price}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <span
                          className={`mr-2 ${
                            product.stock === 0
                              ? "text-red-600 font-bold"
                              : product.stock <= 5
                                ? "text-yellow-600 font-bold"
                                : ""
                          }`}
                        >
                          {product.stock}
                        </span>
                        {product.stock <= 5 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateStock(product.id, product.stock - 1)}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                          disabled={product.stock <= 0}
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateStock(product.id, product.stock + 1)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          +
                        </button>
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No products found.{" "}
                    {searchTerm ? "Try changing your search term." : "Add some products to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold mt-1">{products.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold mt-1">{products.filter((p) => p.stock > 5).length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold mt-1">{products.filter((p) => p.stock > 0 && p.stock <= 5).length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold mt-1">{products.filter((p) => p.stock === 0).length}</p>
        </div>
      </div>
    </>
  )
}

export default InventoryPage

