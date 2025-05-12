import { apiClient } from "../api/httpClient";

export interface SubscribePayload {
  email: string;
}

export interface SubscribeResponse {
  message: string;
}

export const newsletterService = {
  subscribe: (data: SubscribePayload) =>
    apiClient.post<SubscribeResponse>("/newsletter", data),
};
