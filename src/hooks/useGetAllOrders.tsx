import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import IOrder from "../types/IOrder";

const socket = io(`${import.meta.env.VITE_API_URL}/order`, {
  withCredentials: true,

  transports: ["websocket"],
});

const useGetAllOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (socket.connected) {
      console.log("Socket already connected. Emitting immediately.");

      socket.emit("findAllOrder");
    } else {
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");

        socket.emit("findAllOrder");
      });
    }

    socket.on("disconnect", () => {
      console.warn("Disconnected from WebSocket server");
    });

    socket.on("findAllOrder", (response) => {
      console.log("Received WebSocket response:", response);

      if (Array.isArray(response)) {
        setOrders(response);
      } else if (response?.success && Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Invalid WebSocket response format:", response);
      }
    });

    return () => {
      socket.off("findAllOrder");

      socket.off("connect");

      socket.off("disconnect");
    };
  }, []);

  return orders;
};

export default useGetAllOrders;
