import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Product {
  id: number;
  productID: string;
  productName: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  categoryID: string; 
  productDescription: string; 
  imageUrl: string;
  weight: number;
  createdAt: string;
  uploadedAt: string;
  isNewArrival?: boolean;
  isHotProduct?: boolean;
  stock: number;
}


const ProductsListPage = () => {
  const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
  const [products, setProducts] = useState<Product[]>(existingProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log({existingProducts})

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product?.categoryID === selectedCategory;
  
    const matchesSearch =
      product?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      product?.productID?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  
    return matchesCategory && matchesSearch;
  });
  

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.categoryID)),
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/dashboard/products/add"
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category?.charAt(0)?.toUpperCase() + category?.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {product.productName}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.originalPrice ? (
                        <div>
                          <div>LKR {product.price}</div>
                          <div className="text-xs text-gray-500 line-through">
                            Was LKR {product.originalPrice}
                          </div>
                        </div>
                      ) : (
                        <div>LKR {product.price}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{product.categoryID}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.isNewArrival && (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-1">
                          New Arrival
                        </span>
                      )}
                      {product.isHotProduct && (
                        <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                          Hot
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No products found.{" "}
                    {searchTerm || selectedCategory !== "all"
                      ? "Try changing your filters."
                      : "Add some products to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
