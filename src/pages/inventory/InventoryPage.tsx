import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, AlertTriangle } from "lucide-react"
import type { Inventory } from "../../types"
import PageHeader from "../../components/ui/PageHeader"
import SearchBar from "../../components/ui/SearchBar"
import DataTable from "../../components/tables/DataTable"

const InventoryPage = () => {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortField, setSortField] = useState<string>("totalQty")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [stockFilter, setStockFilter] = useState<string>("all")

  useEffect(() => {
    // Load inventory from mock data
    const mockInventory: Inventory[] = [
      {
        id: 1,
        inventoryID: "INV001",
        productID: 101,
        productName: "Smartphone X",
        totalQty: 25,
        usedTime: "2023-07-01",
        damageQty: 2,
        updatedAt: "2023-07-15",
        reorderQty: 10,
        minThreshold: 5,
        maxThreshold: 50,
        category: "Electronics",
        price: 799,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        inventoryID: "INV002",
        productID: 102,
        productName: "Laptop Pro",
        totalQty: 12,
        usedTime: "2023-07-05",
        damageQty: 1,
        updatedAt: "2023-07-15",
        reorderQty: 5,
        minThreshold: 3,
        maxThreshold: 20,
        category: "Electronics",
        price: 1299,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        inventoryID: "INV003",
        productID: 103,
        productName: "Wireless Headphones",
        totalQty: 30,
        usedTime: "2023-07-10",
        damageQty: 0,
        updatedAt: "2023-07-15",
        reorderQty: 15,
        minThreshold: 10,
        maxThreshold: 50,
        category: "Electronics",
        price: 149,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 4,
        inventoryID: "INV004",
        productID: 104,
        productName: "Smart Watch",
        totalQty: 8,
        usedTime: "2023-07-12",
        damageQty: 1,
        updatedAt: "2023-07-15",
        reorderQty: 5,
        minThreshold: 5,
        maxThreshold: 20,
        category: "Electronics",
        price: 249,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 5,
        inventoryID: "INV005",
        productID: 105,
        productName: "Bluetooth Speaker",
        totalQty: 2,
        usedTime: "2023-07-14",
        damageQty: 0,
        updatedAt: "2023-07-15",
        reorderQty: 10,
        minThreshold: 5,
        maxThreshold: 30,
        category: "Electronics",
        price: 99,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 6,
        inventoryID: "INV006",
        productID: 106,
        productName: "Tablet Mini",
        totalQty: 0,
        usedTime: "2023-07-01",
        damageQty: 0,
        updatedAt: "2023-07-15",
        reorderQty: 8,
        minThreshold: 5,
        maxThreshold: 25,
        category: "Electronics",
        price: 399,
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
    ]

    setInventory(mockInventory)
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter((item) => {
      // Apply search filter
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.inventoryID.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply stock filter
      const matchesStockFilter =
        stockFilter === "all" ||
        (stockFilter === "low" && item.totalQty <= item.minThreshold && item.totalQty > 0) ||
        (stockFilter === "out" && item.totalQty === 0) ||
        (stockFilter === "in" && item.totalQty > item.minThreshold)

      return matchesSearch && matchesStockFilter
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "productName") {
        return sortDirection === "asc"
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName)
      } else if (sortField === "totalQty") {
        return sortDirection === "asc" ? a.totalQty - b.totalQty : b.totalQty - a.totalQty
      } else if (sortField === "updatedAt") {
        return sortDirection === "asc"
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
      return 0
    })

  const updateStock = (id: number, newQty: number) => {
    if (newQty < 0) return

    const updatedInventory = inventory.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          totalQty: newQty,
          updatedAt: new Date().toISOString().split("T")[0],
        }
      }
      return item
    })

    setInventory(updatedInventory)
  }

  const columns = [
    {
      header: "Image",
      accessor: (item: Inventory) => (
        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
          <img
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      header: "Product",
      accessor: "productName",
      sortable: true,
      sortKey: "productName",
    },
    { header: "Inventory ID", accessor: "inventoryID" },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: (item: Inventory) => `LKR ${item.price}` },
    {
      header: "Total Qty",
      accessor: (item: Inventory) => (
        <div className="flex items-center">
          <span
            className={`mr-2 ${
              item.totalQty === 0
                ? "text-red-600 font-bold"
                : item.totalQty <= item.minThreshold
                  ? "text-yellow-600 font-bold"
                  : ""
            }`}
          >
            {item.totalQty}
          </span>
          {item.totalQty <= item.minThreshold && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
        </div>
      ),
      sortable: true,
      sortKey: "totalQty",
    },
    { header: "Damage Qty", accessor: "damageQty" },
    { header: "Min/Max", accessor: (item: Inventory) => `${item.minThreshold}/${item.maxThreshold}` },
    {
      header: "Updated At",
      accessor: "updatedAt",
      sortable: true,
      sortKey: "updatedAt",
    },
    {
      header: "Actions",
      accessor: (item: Inventory) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateStock(item.id, item.totalQty - 1)}
            className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
            disabled={item.totalQty <= 0}
          >
            -
          </button>
          <button
            onClick={() => updateStock(item.id, item.totalQty + 1)}
            className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            +
          </button>
          <Link
            to={`/dashboard/products/edit/${item.productID}`}
            className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            <Edit className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Inventory Management"
        action={
          <Link
            to="/dashboard/products/add"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add Product
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search products by name or inventory ID..."
          />

          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Stock</option>
              <option value="low">Low Stock (≤ Min Threshold)</option>
              <option value="out">Out of Stock</option>
              <option value="in">In Stock (&gt; Min Threshold)</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredInventory}
          keyExtractor={(item) => item.id}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          emptyMessage={
            searchTerm
              ? "No products found. Try changing your search term."
              : "No products found. Add some products to get started."
          }
        />
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold mt-1">{inventory.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold mt-1">{inventory.filter((p) => p.totalQty > p.minThreshold).length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold mt-1">
            {inventory.filter((p) => p.totalQty > 0 && p.totalQty <= p.minThreshold).length}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold mt-1">{inventory.filter((p) => p.totalQty === 0).length}</p>
        </div>
      </div>
    </>
  )
}

export default InventoryPage

