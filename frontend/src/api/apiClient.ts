import axiosInstance from "./axiosInstance";

interface ApiResponse {
  message: string;
}

// ✅ Submit client onboarding form
export const submitClientForm = async (
  clientData: Record<string, unknown>
): Promise<ApiResponse> => {
  return axiosInstance.post("/clients", clientData);
};

// ✅ Fetch all clients (Admin only)
export const fetchClients = async () => {
  return axiosInstance.get("/clients");
};
