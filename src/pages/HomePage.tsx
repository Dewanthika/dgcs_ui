import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"
import ProductSection from "../components/ProductSection"
import FeatureSection from "../components/FeatureSection"
import Newsletter from "../components/Newsletter"
import { getNewArrivals, getHotProducts } from "../services/productService"

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  imageUrl: string
}

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [hottestProducts, setHottestProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load products from our service
    setNewArrivals(getNewArrivals())
    setHottestProducts(getHotProducts())
  }, [])

  return (
    <main>
      <Hero />
      <SearchBar />
      <ProductSection title="New Arrivals" subtitle="Check out the latest products" products={newArrivals} />
      <ProductSection title="Hottest Product" subtitle="Unbeatable Deals" products={hottestProducts} />
      <FeatureSection />
      <Newsletter />
    </main>
  )
}

export default HomePage

