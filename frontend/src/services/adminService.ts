import { apiClient } from "../api/httpClient";
import {
  AdminStats,
  ApiResponse,
  User,
  ListResponse,
  Testimonial,
  Subscriber,
  ContactMessage,
  BulkEmailData,
  ContactReplyData,
} from "../types/admin";

// ✅ Explicit params types
type PaginationParams = {
  page?: number;
  limit?: number;
  approved?: boolean;
  active?: boolean;
  replied?: boolean;
};

export const AdminService = {
  // Dashboard Stats
  getStats: () => apiClient.get<ApiResponse<AdminStats>>("/admin/stats"),

  // Users
  getUsers: (params?: PaginationParams) =>
    apiClient.get<ApiResponse<ListResponse<User>>>("/admin/users", { params }),

  updateUserRole: (_id: string, role: User["role"]) =>
    apiClient.put<ApiResponse<User>, { role: User["role"] }>(
      `/admin/users/${_id}/role`,
      { role }
    ),

  deleteUser: (_id: string) =>
    apiClient.delete<ApiResponse<{ success: boolean }>>(`/admin/users/${_id}`),

  toggleUserStatus: (_id: string, isActive: boolean) =>
    apiClient.patch<ApiResponse<User>, { isActive: boolean }>(
      `/admin/users/${_id}/status`,
      { isActive }
    ),

  getUserById: (_id: string) =>
    apiClient.get<ApiResponse<User>>(`/admin/users/${_id}`),

  // Testimonials
  getTestimonials: (params?: { approved?: boolean }) =>
    apiClient.get<ApiResponse<ListResponse<Testimonial>>>(
      "/admin/testimonials",
      { params }
    ),

  approveTestimonial: (_id: string) =>
    apiClient.patch<ApiResponse<Testimonial>, object>(
      `/admin/testimonials/${_id}/approve`,
      {}
    ),

  deleteTestimonial: (_id: string) =>
    apiClient.delete<ApiResponse<{ success: boolean }>>(
      `/admin/testimonials/${_id}`
    ),

  // Subscribers
  getSubscribers: (params?: { active?: boolean }) =>
    apiClient.get<ApiResponse<ListResponse<Subscriber>>>("/admin/subscribers", {
      params,
    }),

  deleteSubscriber: (_id: string) =>
    apiClient.delete<ApiResponse<{ success: boolean }>>(
      `/admin/subscribers/${_id}`
    ),

  sendBulkEmail: (emailData: BulkEmailData) =>
    apiClient.post<
      ApiResponse<{ success: boolean; sentCount: number }>,
      BulkEmailData
    >("/admin/subscribers/send-email", emailData),

  // Contact Messages
  getContactMessages: (params?: { replied?: boolean }) =>
    apiClient.get<ApiResponse<ListResponse<ContactMessage>>>(
      "/admin/contacts",
      { params }
    ),

  deleteContactMessage: (_id: string) =>
    apiClient.delete<ApiResponse<{ success: boolean }>>(
      `/admin/contacts/${_id}`
    ),

  replyToContactMessage: (_id: string, replyData: ContactReplyData) =>
    apiClient.post<ApiResponse<{ success: boolean }>, ContactReplyData>(
      `/contacts/${_id}/reply`,
      replyData
    ),
};
