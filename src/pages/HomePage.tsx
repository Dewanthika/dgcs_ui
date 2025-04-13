import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import FeatureSection from "../components/FeatureSection"
import Hero from "../components/Hero"
import Newsletter from "../components/Newsletter"
import ProductSection from "../components/ProductSection"
import SearchBar from "../components/SearchBar"
import IProduct from "../types/IProduct"

// Socket connection to the WebSocket server
const socket = io("http://localhost:8080/products", {
  withCredentials: true,
  transports: ["websocket"],
});

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([])
  const [hottestProducts, setHottestProducts] = useState<IProduct[]>([])
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Ensure the socket connection is open
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.emit("findAllProduct");

    // Listen for the response when fetching all products
    socket.on("findAllProduct", (response) => {
      if (response) {
        setProducts(response);
      } else {
        // Handle error case
        console.error("Socket error:", response.error);
      }
      // setIsLoading(false);
    });

    // Listen for product updates and update the list when a product is updated
    socket.on("productUpdated", (updatedProduct) => {
      if (updatedProduct) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
      } else {
        console.error("Error: productUpdated event received without data.");
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("findAllProduct");
      socket.off("productUpdated"); // Remove the event listener for product updates
    };
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;
  
    const now = new Date();
  
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
  
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2);
  
    const hottest = products.filter(product => {
      const createdAt = new Date(product?.createdAt || "");
      return createdAt >= oneWeekAgo;
    });
  
    const newArrivals = products.filter(product => {
      const createdAt = new Date(product?.createdAt || "");
      return createdAt >= twoMonthsAgo;
    });
  
    setHottestProducts(hottest);
    setNewArrivals(newArrivals);
  
  }, [products]);  
  

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

