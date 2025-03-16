import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"
import ProductSection from "../components/ProductSection"
import FeatureSection from "../components/FeatureSection"
import Newsletter from "../components/Newsletter"

const HomePage = () => {
  const newArrivals = [
    {
      id: 1,
      title: "Product Title",
      price: 9999,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      title: "Product Title",
      price: 7649,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      title: "Product Title",
      price: 8799,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      title: "Product Title",
      price: 7999,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      title: "Product Title",
      price: 7999,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]

  const hottestProducts = [
    {
      id: 6,
      title: "Product Title",
      price: 4676,
      originalPrice: 7499,
      discountPercentage: 38,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      title: "Product Title",
      price: 7999,
      originalPrice: 9999,
      discountPercentage: 20,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 8,
      title: "Product Title",
      price: 7999,
      originalPrice: 9999,
      discountPercentage: 20,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 9,
      title: "Product Title",
      price: 5399,
      originalPrice: 8499,
      discountPercentage: 36,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 10,
      title: "Product Title",
      price: 5399,
      originalPrice: 8999,
      discountPercentage: 40,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]

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

