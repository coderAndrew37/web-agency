import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

interface ApiResponse {
  message: string;
}

interface ApiError {
  error: string;
}

// ✅ Submit client onboarding form
export const submitClientForm = async (
  clientData: Record<string, unknown>
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      "/api/clients",
      clientData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw new Error(axiosError.response?.data?.error || "Submission failed.");
  }
};

// ✅ Fetch all clients (Admin view)
interface Client {
  id: string;
  name: string;
  email: string;
  // Add other client properties here
}

export const fetchClients = async (): Promise<Client[]> => {
  try {
    const response = await apiClient.get("/api/clients");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw new Error(
      axiosError.response?.data?.error || "Failed to fetch clients."
    );
  }
};

export default apiClient;
