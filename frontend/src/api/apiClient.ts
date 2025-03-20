import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Fetch all clients
export const useFetchClients = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["clients", page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/clients", {
        params: { page, limit },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 mins
  });
};

// ✅ Submit client onboarding form
export const useSubmitClientForm = () => {
  return useMutation({
    mutationFn: async (clientData: Record<string, unknown>) => {
      const { data } = await axiosInstance.post("/clients", clientData);
      return data;
    },
  });
};
