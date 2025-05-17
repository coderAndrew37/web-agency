import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactService } from "../../services/contactService";
import { ApiErrorResponse, ContactFormData } from "../../types/contact";

export const useSubmitContactForm = () =>
  useMutation<{ message: string }, ApiErrorResponse, ContactFormData>({
    mutationFn: (data) => ContactService.submit(data), // ✅ now already returns { message }
  });

export const useFetchContactMessages = () =>
  useQuery<ContactFormData[], ApiErrorResponse>({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const res = await ContactService.getAll();
      return res;
    },
  });
