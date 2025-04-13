// src/services/contactService.ts
import { apiClient } from "../api/httpClient";
import { ContactFormData } from "../types/contact";
import { ApiResponse } from "../types/api";

export const ContactService = {
  submit: (data: ContactFormData) =>
    apiClient.post<ApiResponse<{ message: string }>, ContactFormData>(
      "/contact",
      data
    ),

  getAll: () =>
    apiClient.get<ApiResponse<ContactFormData[]>>("/admin/contacts"),
};
