import { useCallback, useState } from "react";
import { handleAxiosError } from "../helpers/axiosHelper";
import appFetch from "../utils/appFetch";

interface IUseApiFetchOptions {
  headers?: Record<string, string>;
  method?: "get" | "post" | "put" | "delete" | "patch";
}

interface UseApiFetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  postData: (postData: T) => Promise<T | void>;
  cancelRequest: () => void;
}

interface IUseApiFetchProps {
  url: string;
  options?: IUseApiFetchOptions;
}

const useApiFetch = <T,>({
  url,
  options = {},
}: IUseApiFetchProps): UseApiFetchResponse<T> => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const abortController = new AbortController();

  const cancelRequest = useCallback(() => {
    abortController.abort();
  }, [abortController]);

  const postData = useCallback(
    async (postData: T): Promise<T | void> => {
      setLoading(true);
      setError(null);

      try {
        const responseData: T = await appFetch({
          url,
          method: options?.method || "post",
          data: postData,
          headers: options?.headers,
          signal: abortController.signal,
        });

        setData(responseData);
        return responseData;
      } catch (error) {
        if (abortController.signal.aborted) {
          setError(new Error("Request cancelled"));
        } else {
          // Fixed: Properly type the error before passing to handleAxiosError
          const errorMessage = error instanceof Error 
            ? handleAxiosError(error.message) 
            : handleAxiosError(String(error));
          
          setError(new Error(errorMessage));
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [url, options, abortController]
  );

  return { data, isLoading, error, postData, cancelRequest };
};

export default useApiFetch;