import { apiClient } from "../api/httpClient";
import { ClientData, ApiResponse } from "../types/client";

export const ClientService = {
  submitOnboarding: (data: ClientData) =>
    apiClient.post<ApiResponse<{ message: string }>, ClientData>(
      "/clients",
      data
    ),
};
