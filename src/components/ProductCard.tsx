import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  handleAddToCart: () => void;
}

const ProductCard = ({
  id,
  title,
  price,
  imageUrl,
  handleAddToCart,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow-sm transition-transform hover:shadow-md hover:-translate-y-1">
      <Link
        to={`/product/${id}`}
        className="block h-48 bg-gray-200 flex items-center justify-center"
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="max-h-full object-contain"
        />
      </Link>
      <div className="p-4 space-y-3">
        <Link to={`/product/${id}`} className="font-medium hover:underline">
          {title}
        </Link>
        {/* <p className="text-sm text-muted">Product Description</p> */}
        <div>
          <div className="font-bold">LKR {price}</div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
