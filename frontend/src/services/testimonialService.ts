// src/services/testimonialService.ts
import { apiClient } from "../api/httpClient";
import { ApiResponse } from "../types/client";
import { Testimonial } from "../types/testimonial";

export const TestimonialService = {
  // ✅ Submit a new testimonial (multipart/form-data)
  submit: (formData: FormData) =>
    apiClient.post<ApiResponse<Testimonial>, FormData>(
      "/testimonials",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  // ✅ Get all public testimonials
  getAll: () => apiClient.get<ApiResponse<Testimonial[]>>("/testimonials"),

  // ✅ Admin: Get all testimonials
  getAllAdmin: () =>
    apiClient.get<ApiResponse<Testimonial[]>>("/admin/testimonials"),

  // ✅ Admin: Approve testimonial
  approve: (_id: string) =>
    apiClient.patch<ApiResponse<Testimonial>, null>(
      `/admin/testimonials/${_id}/approve`,
      null
    ),

  // ✅ Admin: Delete testimonial
  delete: (_id: string) =>
    apiClient.delete<ApiResponse<{ success: boolean }>>(
      `/admin/testimonials/${_id}`
    ),
};
