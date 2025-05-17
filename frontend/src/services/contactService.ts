import { apiClient } from "../api/httpClient";
import { ContactFormData } from "../types/contact";

export const ContactService = {
  submit: (data: ContactFormData) =>
    apiClient
      .post<null, ContactFormData>("/contact", data)
      .then(() => ({ message: "Your message has been sent!" })), // ✅ return message manually

  getAll: async (): Promise<ContactFormData[]> => {
    const res = await apiClient.get<ContactFormData[]>("/admin/contacts");
    return res.data;
  },
};
