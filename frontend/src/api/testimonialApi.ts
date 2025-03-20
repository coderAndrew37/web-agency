import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Submit Testimonial
export const useSubmitTestimonial = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return axiosInstance.post("/testimonials", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
};

// ✅ Fetch Testimonials
export const useFetchTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/testimonials");
      return data;
    },
    staleTime: 5 * 60 * 1000, // ✅ Cache testimonials for 5 mins
  });
};
