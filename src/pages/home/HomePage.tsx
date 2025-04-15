import { useEffect, useState } from "react";
import FeatureSection from "../../components/FeatureSection";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import ProductSection from "../../components/ProductSection";
import SearchBar from "../../components/SearchBar";
import useGetAllProduct from "../../hooks/useGetAllProduct";
import IProduct from "../../types/IProduct";

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [hottestProducts, setHottestProducts] = useState<IProduct[]>([]);
  const products = useGetAllProduct();

  useEffect(() => {
    if (!products || products.length === 0) return;

    const now = new Date();

    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2);

    const hottest = products.filter((product) => {
      const createdAt = new Date(product?.createdAt || "");
      return createdAt >= oneWeekAgo;
    });

    const newArrivals = products.filter((product) => {
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
      <ProductSection
        title="New Arrivals"
        subtitle="Check out the latest products"
        products={newArrivals}
      />
      <ProductSection
        title="Hottest Product"
        subtitle="Unbeatable Deals"
        products={hottestProducts}
      />
      <FeatureSection />
      <Newsletter />
    </main>
  );
};

export default HomePage;
