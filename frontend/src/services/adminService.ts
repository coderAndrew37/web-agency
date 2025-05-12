import { apiClient } from "../api/httpClient";
import {
  AdminStats,
  User,
  ListResponse,
  Testimonial,
  Subscriber,
  ContactMessage,
  BulkEmailData,
  ContactReplyData,
} from "../types/admin";

type PaginationParams = {
  page?: number;
  limit?: number;
  approved?: boolean;
  active?: boolean;
  replied?: boolean;
};

export const AdminService = {
  // ✅ Dashboard Stats
  getStats: async (): Promise<AdminStats> => {
    const res = await apiClient.get<{ success: boolean; data: AdminStats }>(
      "/admin/stats"
    );
    return res.data.data;
  },

  // ✅ Users
  getUsers: async (params?: PaginationParams): Promise<ListResponse<User>> => {
    const res = await apiClient.get<{
      success: boolean;
      data: ListResponse<User>;
    }>("/admin/users", { params });
    return res.data.data;
  },

  updateUserRole: async (_id: string, role: User["role"]): Promise<User> => {
    const res = await apiClient.put<
      { success: boolean; data: User },
      { role: User["role"] }
    >(`/admin/users/${_id}/role`, { role });
    return res.data.data;
  },

  deleteUser: (_id: string): Promise<{ success: boolean }> =>
    apiClient
      .delete<{ success: boolean }>("/admin/users/" + _id)
      .then((res) => res.data),

  toggleUserStatus: async (_id: string, isActive: boolean): Promise<User> => {
    const res = await apiClient.patch<
      { success: boolean; data: User },
      { isActive: boolean }
    >(`/admin/users/${_id}/status`, { isActive });
    return res.data.data;
  },

  getUserById: async (_id: string): Promise<User> => {
    const res = await apiClient.get<{ success: boolean; data: User }>(
      `/admin/users/${_id}`
    );
    return res.data.data;
  },

  // ✅ Testimonials
  getTestimonials: async (params?: {
    approved?: boolean;
  }): Promise<ListResponse<Testimonial>> => {
    const res = await apiClient.get<{
      success: boolean;
      data: ListResponse<Testimonial>;
    }>("/admin/testimonials", { params });
    return res.data.data;
  },

  approveTestimonial: async (_id: string): Promise<Testimonial> => {
    const res = await apiClient.patch<
      { success: boolean; data: Testimonial },
      object
    >(`/admin/testimonials/${_id}/approve`, {});
    return res.data.data;
  },

  deleteTestimonial: (_id: string): Promise<{ success: boolean }> =>
    apiClient
      .delete<{ success: boolean }>(`/admin/testimonials/${_id}`)
      .then((res) => res.data),

  // ✅ Subscribers
  getSubscribers: async (params?: {
    active?: boolean;
  }): Promise<ListResponse<Subscriber>> => {
    const res = await apiClient.get<{
      success: boolean;
      data: ListResponse<Subscriber>;
    }>("/admin/subscribers", { params });
    return res.data.data;
  },

  deleteSubscriber: (_id: string): Promise<{ success: boolean }> =>
    apiClient
      .delete<{ success: boolean }>(`/admin/subscribers/${_id}`)
      .then((res) => res.data),

  sendBulkEmail: async (
    emailData: BulkEmailData
  ): Promise<{ success: boolean; sentCount: number }> => {
    const res = await apiClient.post<
      { success: boolean; data: { success: boolean; sentCount: number } },
      BulkEmailData
    >("/admin/subscribers/send-email", emailData);
    return {
      success: res.data.data.success,
      sentCount: res.data.data.sentCount,
    };
  },

  // ✅ Contacts
  getContactMessages: async (params?: {
    replied?: boolean;
  }): Promise<ListResponse<ContactMessage>> => {
    const res = await apiClient.get<{
      success: boolean;
      data: ListResponse<ContactMessage>;
    }>("/admin/contacts", { params });
    return res.data.data;
  },

  deleteContactMessage: (_id: string): Promise<{ success: boolean }> =>
    apiClient
      .delete<{ success: boolean }>(`/admin/contacts/${_id}`)
      .then((res) => res.data),

  replyToContactMessage: async (
    _id: string,
    replyData: ContactReplyData
  ): Promise<{ success: boolean }> => {
    const res = await apiClient.post<{ success: boolean }, ContactReplyData>(
      `/contacts/${_id}/reply`,
      replyData
    );
    return res.data;
  },
};
