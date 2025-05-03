import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Order {
  _id: string;
  userID: {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  items: {
    product: {
      _id: string;
      title: string;
      price: number;
      stock?: number;
    };
    quantity: number;
    unitPrice: number;
  }[];
  paymentStatus: string;
  orderStatus: string;
  paymentDate?: string;
  orderDate?: string;
  totalAmount: number;
}
// Socket connection to the WebSocket server
const socket = io(`${import.meta.env.VITE_API_URL}/order`, {
  withCredentials: true,
  transports: ["websocket"],
});

export const useOrderWebSocket = ({ id }: { id?: string }) => {
  const [orders, setOrders] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    socket.emit("findOneOrder", id);

    const handleFindOneProduct = (response: Order) => {
      console.log(response);

      if (response) {
        setOrders(response);
      } else {
        console.error("Socket error:", response);
      }
    };

    socket.on("findOneOrder", handleFindOneProduct);

    return () => {
      socket.off("findOneOrder", handleFindOneProduct);
    };

    console.log(orders);
  }, [id]);

  return orders;
};
