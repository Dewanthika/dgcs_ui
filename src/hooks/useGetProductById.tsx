import { useState, useEffect } from "react";
import IProduct from "../types/IProduct";
import { io } from "socket.io-client";

// Socket connection to the WebSocket server
const socket = io(`${import.meta.env.VITE_API_URL}/products`, {
  withCredentials: true,
  transports: ["websocket"],
});

const useGetProductById = ({ id }: { id?: string }) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!id) return;

    // Request one product by ID
    socket.emit("findOneProduct", id);

    // Listen for the response
    const handleFindOneProduct = (response: IProduct) => {
      if (response) {
        setProduct(response);
      } else {
        console.error("Socket error:", response);
      }
    };

    socket.on("findOneProduct", handleFindOneProduct);

    // Cleanup to prevent memory leaks
    return () => {
      socket.off("findOneProduct", handleFindOneProduct);
    };
  }, [id]);

  return product;
};

export default useGetProductById;
