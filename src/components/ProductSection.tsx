import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import IProduct from "../types/IProduct";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/slice/cartSlice";

interface IProductSectionProps {
  title: string;
  subtitle?: string;
  products: IProduct[];
}

const ProductSection = ({ title, subtitle, products }: IProductSectionProps) => {
  const dispatch = useAppDispatch();

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted mt-1">{subtitle}</p>}
          </div>
          <Link to="/shop" className="text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id!}
              title={product.productName}
              price={+product.price!}
              originalPrice={product.price}
              discountPercentage={product.price}
              imageUrl={product.imageURL || ""}
              handleAddToCart={() => {
                dispatch(addToCart(product));
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
