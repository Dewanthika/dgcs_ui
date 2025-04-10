import { AxiosRequestConfig, AxiosResponse } from "axios";
import baseAxiosInstance from "./baseAxios";

interface AppFetchOptions extends AxiosRequestConfig {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
}

const appFetch = async <T>(options: AppFetchOptions): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await baseAxiosInstance({
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error("Error in appFetch:", error);
    throw error;
  }
};

export default appFetch;
