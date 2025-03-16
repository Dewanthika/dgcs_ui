import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  imageUrl: string
}

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
}

const ProductSection = ({ title, subtitle, products }: ProductSectionProps) => {
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
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection

