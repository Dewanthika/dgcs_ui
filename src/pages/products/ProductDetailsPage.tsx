import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetProductById from "../../hooks/useGetProductById";
import ICategory from "../../types/ICategory";
import { addToCart } from "../../store/slice/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const product = useGetProductById({ id });
  const dispatch = useDispatch();

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.stock!) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({ product, quantity }));
  };

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.imageURL || "/placeholder.svg"}
            alt={product.productName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.productName}</h1>
          <div className="text-2xl font-bold">LKR {product.price}</div>

          {product.price && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through">
                LKR {product.price}
              </span>
            </div>
          )}
          <div className="space-y-2 border-t pt-6">
            <h2 className="font-bold text-lg">Description</h2>
            <p className="text-gray-700">{product.productDescription}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-lg">Category</h2>
            <p className="text-gray-700">
              {(product.categoryID as ICategory).name}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-lg">Availability</h2>
            <p
              className={`${
                product.stock! > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock! > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
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
                disabled={product.stock! <= quantity}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              disabled={product.stock! <= 0}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
