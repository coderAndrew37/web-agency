import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import {
  AdminStats,
  User,
  Testimonial,
  Subscriber,
  ContactMessage,
  ApiResponse,
  ListResponse,
  ApiErrorResponse,
  BulkEmailData,
  ContactReplyData,
} from "../types/admin";
import { handleApiError } from "../Utils/apiErrorHandler";

// Helper function for consistent API error handling
const withErrorHandling = <TData, TVariables>(
  fn: (variables: TVariables) => Promise<TData>
): ((variables: TVariables) => Promise<TData>) => {
  return async (variables: TVariables) => {
    try {
      return await fn(variables);
    } catch (error) {
      handleApiError(error, { showToast: true });
      throw error;
    }
  };
};

// ✅ Fetch Admin Dashboard Stats
export const useFetchAdminStats = () => {
  return useQuery<AdminStats, ApiErrorResponse>({
    queryKey: ["admin-stats"],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<ApiResponse<AdminStats>>(
        "/admin/stats"
      );
      return data.data;
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

// Add this to all admin queries
// Removed unused adminQueryDefaults as it was not being used in the code.

// ✅ Fetch All Users with pagination
export const useFetchUsers = (params?: { page?: number; limit?: number }) => {
  return useQuery<ListResponse<User>, ApiErrorResponse>({
    queryKey: ["admin-users", params],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<ApiResponse<ListResponse<User>>>(
        "/admin/users",
        { params }
      );
      return data.data;
    }),
  });
};

// ✅ Update User Role
export const useUpdateUserRole = () => {
  return useMutation<
    User,
    ApiErrorResponse,
    { _id: string; role: "user" | "admin" | "moderator" }
  >({
    mutationFn: withErrorHandling(async ({ _id, role }) => {
      const { data } = await axiosInstance.put<ApiResponse<User>>(
        `/admin/users/${_id}/role`,
        { role }
      );
      return data.data;
    }),
  });
};

// ✅ Delete User
export const useDeleteUser = () => {
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: withErrorHandling(async (_id) => {
      const { data } = await axiosInstance.delete<
        ApiResponse<{ success: boolean }>
      >(`/admin/users/${_id}`);
      return data.data;
    }),
  });
};

// ✅ Fetch All Testimonials
export const useFetchAllTestimonials = (params?: { approved?: boolean }) => {
  return useQuery<ListResponse<Testimonial>, ApiErrorResponse>({
    queryKey: ["admin-testimonials", params],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<
        ApiResponse<ListResponse<Testimonial>>
      >("/admin/testimonials", { params });
      return data.data;
    }),
  });
};

// ✅ Approve Testimonial
export const useApproveTestimonial = () => {
  return useMutation<Testimonial, ApiErrorResponse, string>({
    mutationFn: withErrorHandling(async (_id) => {
      const { data } = await axiosInstance.patch<ApiResponse<Testimonial>>(
        `/admin/testimonials/${_id}/approve`
      );
      return data.data;
    }),
  });
};

// ✅ Delete Testimonial
export const useDeleteTestimonial = () => {
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: withErrorHandling(async (_id) => {
      const { data } = await axiosInstance.delete<
        ApiResponse<{ success: boolean }>
      >(`/admin/testimonials/${_id}`);
      return data.data;
    }),
  });
};

// ✅ Fetch Newsletter Subscribers
export const useFetchSubscribers = (params?: { active?: boolean }) => {
  return useQuery<ListResponse<Subscriber>, ApiErrorResponse>({
    queryKey: ["admin-subscribers", params],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<
        ApiResponse<ListResponse<Subscriber>>
      >("/admin/subscribers", { params });
      return data.data;
    }),
  });
};

// ✅ Delete Subscriber
export const useDeleteSubscriber = () => {
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: withErrorHandling(async (_id) => {
      const { data } = await axiosInstance.delete<
        ApiResponse<{ success: boolean }>
      >(`/admin/subscribers/${_id}`);
      return data.data;
    }),
  });
};

// ✅ Send Bulk Email to Subscribers
export const useSendBulkEmail = () => {
  return useMutation<
    { success: boolean; sentCount: number },
    ApiErrorResponse,
    BulkEmailData
  >({
    mutationFn: withErrorHandling(async (emailData) => {
      const { data } = await axiosInstance.post<
        ApiResponse<{ success: boolean; sentCount: number }>
      >("/admin/subscribers/send-email", emailData);
      return data.data;
    }),
  });
};

// ✅ Fetch Contact Messages
export const useFetchContactMessages = (params?: { replied?: boolean }) => {
  return useQuery<ListResponse<ContactMessage>, ApiErrorResponse>({
    queryKey: ["admin-contacts", params],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<
        ApiResponse<ListResponse<ContactMessage>>
      >("/admin/contacts", { params });
      return data.data;
    }),
  });
};

// ✅ Delete Contact Message
export const useDeleteContactMessage = () => {
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: withErrorHandling(async (_id) => {
      const { data } = await axiosInstance.delete<
        ApiResponse<{ success: boolean }>
      >(`/admin/contacts/${_id}`);
      return data.data;
    }),
  });
};

// ✅ Reply to Contact Message
export const useReplyToContactMessage = () => {
  return useMutation<
    { success: boolean },
    ApiErrorResponse,
    { _id: string; replyData: ContactReplyData }
  >({
    mutationFn: withErrorHandling(async ({ _id, replyData }) => {
      const { data } = await axiosInstance.post<
        ApiResponse<{ success: boolean }>
      >(`/contacts/${_id}/reply`, replyData);
      return data.data;
    }),
  });
};

// ✅ Toggle User Active Status
export const useToggleUserStatus = () => {
  return useMutation<
    User,
    ApiErrorResponse,
    { _id: string; isActive: boolean }
  >({
    mutationFn: withErrorHandling(async ({ _id, isActive }) => {
      const { data } = await axiosInstance.patch<ApiResponse<User>>(
        `/admin/users/${_id}/status`,
        { isActive }
      );
      return data.data;
    }),
  });
};

// ✅ Get Single User
export const useGetUser = (_id: string) => {
  return useQuery<User, ApiErrorResponse>({
    queryKey: ["user", _id],
    queryFn: withErrorHandling(async () => {
      const { data } = await axiosInstance.get<ApiResponse<User>>(
        `/admin/users/${_id}`
      );
      return data.data;
    }),
    enabled: !!_id,
  });
};
