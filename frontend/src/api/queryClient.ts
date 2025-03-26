import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (replaced cacheTime in v5)
      retry: (failureCount, error: unknown) => {
        const axiosError = error as AxiosError;
        if (axiosError?.response?.status === 404) return false;
        if (axiosError?.response?.status === 401) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
});
