import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import IProduct from "../types/IProduct";

// Socket connection to the WebSocket server
const socket = io(`${import.meta.env.VITE_API_URL}/products`, {
  withCredentials: true,
  transports: ["websocket"],
});

const useGetAllProduct = () => {
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

  
  return products;
};

export default useGetAllProduct;
