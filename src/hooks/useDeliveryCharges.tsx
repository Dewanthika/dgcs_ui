import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/courier-charges';

interface DeliveryCharge {
  _id?: string;
  serviceCompany: string;
  firstKGCost: number;
  extraKGCost: number;
  status: 'Active' | 'Inactive';
}

const useDeliveryCharges = () => {
  const [charges, setCharges] = useState<DeliveryCharge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getAuthHeaders = () => {
    const rawToken = localStorage.getItem("accessToken");
    const cleanedToken = rawToken?.replace(/^"(.*)"$/, '$1');
    return {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    };
  };
  

  const fetchCharges = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DeliveryCharge[]>(API_BASE, getAuthHeaders());
      setCharges(response.data);
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch charges:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCharge = async (data: DeliveryCharge): Promise<DeliveryCharge> => {
    try {
      const response = await axios.post<DeliveryCharge>(API_BASE, data, getAuthHeaders());
      setCharges((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err as Error);
      console.error("Failed to add charge:", err);
      throw err;
    }
  };

  const updateCharge = async (id: string, data: Partial<DeliveryCharge>) => {
    try {
      const response = await axios.patch<DeliveryCharge>(
        `${API_BASE}/${id}`,
        data,
        getAuthHeaders()
      );
      setCharges((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      console.error("Failed to update charge:", err);
      throw err;
    }
  };

  const deleteCharge = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE}/${id}`, getAuthHeaders());
      setCharges((prev) => prev.filter((charge) => charge._id !== id));
    } catch (err) {
      setError(err as Error);
      console.error("Failed to delete charge:", err);
      throw err;
    }
  };
  

  useEffect(() => {
    fetchCharges();
  }, []);

  return {
    charges,
    loading,
    error,
    fetchCharges,
    addCharge,
    updateCharge,
    deleteCharge,
  };
};

export default useDeliveryCharges;
