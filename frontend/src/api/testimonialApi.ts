// testimonialApi.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface Testimonial {
  _id: string;
  name: string;
  message: string;
  approved: boolean;
  image?: string;
  createdAt?: string;
}

export const useSubmitTestimonial = () => {
  return useMutation<Testimonial, Error, FormData>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/testimonials", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};

export const useFetchTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/testimonials");
      return data;
    },
  });
};

export const useFetchAllTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/testimonials");
      return data;
    },
  });
};

export const useApproveTestimonial = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (_id) => {
      await axiosInstance.patch(`/admin/testimonials/${_id}/approve`);
    },
  });
};

export const useDeleteTestimonial = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (_id) => {
      await axiosInstance.delete(`/admin/testimonials/${_id}`);
    },
  });
};
