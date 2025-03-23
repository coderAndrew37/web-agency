import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Define API response type
interface ClientResponse {
  message: string;
}

// ✅ Fetch all clients with pagination
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
  return useMutation<ClientResponse, Error, Record<string, unknown>>({
    mutationFn: async (clientData) => {
      const { data } = await axiosInstance.post<ClientResponse>(
        "/clients",
        clientData
      );
      return data;
    },
    onError: (error) => {
      console.error("❌ Client submission failed:", error);
    },
  });
};
