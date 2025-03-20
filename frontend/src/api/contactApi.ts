import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Submit Contact Form
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: async (contactData: {
      name: string;
      email: string;
      message: string;
    }) => {
      return axiosInstance.post("/contact", contactData);
    },
  });
};

// ✅ Fetch Contact Messages (Admin Only)
export const useFetchContactMessages = () => {
  return useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/contact");
      return data;
    },
  });
};
