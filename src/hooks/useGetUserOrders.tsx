import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import IOrder from "../types/IOrder";
import { useAppSelector } from "../store/store";
import { getProfile } from "../store/selectors/userSelector";

const socket = io(`${import.meta.env.VITE_API_URL}/order`, {
  withCredentials: true,
  transports: ["websocket"],
});

const useGetUserOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const profile = useAppSelector(getProfile);

  useEffect(() => {
    const id = profile?._id;
    if (!id) return;
    socket.emit("findUserOrders", id);

    const handleFindOneOrder = (response: IOrder[]) => {
      if (response) {
        setOrders(response);
      } else {
        setError("error");
        console.error("Socket error:", response);
      }
    };

    socket.on("findUserOrders", handleFindOneOrder);

    return () => {
      socket.off("findUserOrders");
    };
  }, [profile?._id]);

  return { orders, error };
};

export default useGetUserOrders;
