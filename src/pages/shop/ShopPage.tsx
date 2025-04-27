import type React from "react";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { addToCart } from "../../store/slice/cartSlice";
import { useAppDispatch } from "../../store/store";
import ICategory from "../../types/ICategory";
import useGetAllProduct from "../../hooks/useGetAllProduct";

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState(true);
  const products = useGetAllProduct();
  const dispatch = useAppDispatch();

  const handleCategoryChange = (categoryId: string) => {
    // setCategories(
    //   categories.map((category) =>
    //     category.id === categoryId
    //       ? { ...category, checked: !category.checked }
    //       : category
    //   )
    // );
  };

  const clearAllFilters = () => {
    setCategories(
      categories.map((category) => ({ ...category, checked: false }))
    );
    setSearchTerm("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search functionality
  };

  // Filter products based on selected categories and search term
  const filteredProducts = products.filter((product) => {
    // Check if any category is selected
    // const selectedCategories = categories
    //   .filter((cat) => cat.checked)
    //   .map((cat) => cat.name);
    // const matchesCategory =
    //   selectedCategories.length === 0 ||
    //   selectedCategories.includes(product.category);

    // Check if product matches search term
    const matchesSearch =
      searchTerm === "" ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="container py-8 h-screen">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex max-w-xl">
          <label
            htmlFor="search"
            className="flex items-center mr-2 font-medium"
          >
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
          <button
            onClick={clearAllFilters}
            className="text-blue-500 hover:underline mb-4"
          >
            Clear all
          </button>

          <div className="border-b pb-4 mb-4">
            <button
              className="flex items-center justify-between w-full font-bold mb-4"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  showCategories ? "rotate-180" : ""
                }`}
              />
            </button>

            {showCategories && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category._id}`}
                      // checked={category.checked}
                      onChange={() => handleCategoryChange(category._id!)}
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="flex-1"
                    >
                      {category.name}
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
                <div key={product._id}>
                  <ProductCard
                    key={product._id}
                    id={product._id!}
                    title={product.productName}
                    price={+product.price!}
                    originalPrice={product.price}
                    discountPercentage={product.price}
                    imageUrl={product.imageURL || ""}
                    handleAddToCart={() => {
                      dispatch(addToCart({ product, quantity: 1 }));
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
