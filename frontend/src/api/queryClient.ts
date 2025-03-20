import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // ✅ Cache data for 5 mins
      retry: 2, // ✅ Retry failed requests twice
      refetchOnReconnect: true, // ✅ Auto-refetch when network reconnects
    },
  },
});
