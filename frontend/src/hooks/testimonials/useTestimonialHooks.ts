import { useMutation, useQuery } from "@tanstack/react-query";
import { TestimonialService } from "../../services/testimonialService";
import { Testimonial } from "../../types/testimonial";
import { ApiErrorResponse } from "../../types/api";

export const useSubmitTestimonial = () =>
  useMutation<Testimonial, ApiErrorResponse, FormData>({
    mutationFn: (data) =>
      TestimonialService.submit(data).then((res) => res.data),
  });

export const useFetchTestimonials = () =>
  useQuery<Testimonial[], ApiErrorResponse>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await TestimonialService.getAll();
      return res.data;
    },
  });

export const useFetchAllTestimonials = () =>
  useQuery<Testimonial[], ApiErrorResponse>({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const res = await TestimonialService.getAllAdmin();
      return res.data;
    },
  });

export const useApproveTestimonial = () =>
  useMutation<void, ApiErrorResponse, string>({
    mutationFn: async (_id) => {
      await TestimonialService.approve(_id);
    },
  });

export const useDeleteTestimonial = () =>
  useMutation<void, ApiErrorResponse, string>({
    mutationFn: async (_id) => {
      await TestimonialService.delete(_id);
    },
  });
