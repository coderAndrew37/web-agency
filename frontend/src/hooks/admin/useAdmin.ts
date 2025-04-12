import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "../../services/adminService";
import {
  AdminStats,
  ApiErrorResponse,
  User,
  ListResponse,
  Testimonial,
  Subscriber,
  ContactMessage,
  BulkEmailData,
  ContactReplyData,
  QueryParams,
} from "../../types/admin";
import { handleApiError } from "../../Utils/apiErrorHandler";

export const useAdminStats = () =>
  useQuery<AdminStats, ApiErrorResponse>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await AdminService.getStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

export const useFetchUsers = (params?: QueryParams) =>
  useQuery<ListResponse<User>, ApiErrorResponse>({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const response = await AdminService.getUsers(params);
      return response.data;
    },
  });

export const useUpdateUserRole = () =>
  useMutation<User, ApiErrorResponse, { _id: string; role: User["role"] }>({
    mutationFn: async ({ _id, role }) => {
      const response = await AdminService.updateUserRole(_id, role);
      return response.data;
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: AdminService.deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
};

export const useToggleUserStatus = () =>
  useMutation<User, ApiErrorResponse, { _id: string; isActive: boolean }>({
    mutationFn: async ({ _id, isActive }) => {
      const response = await AdminService.toggleUserStatus(_id, isActive);
      return response.data;
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useGetUser = (_id: string) =>
  useQuery<User, ApiErrorResponse>({
    queryKey: ["admin-user", _id],
    queryFn: async () => {
      const response = await AdminService.getUserById(_id);
      return response.data;
    },
    enabled: !!_id,
  });

export const useFetchTestimonials = (params?: { approved?: boolean }) =>
  useQuery<ListResponse<Testimonial>, ApiErrorResponse>({
    queryKey: ["admin-testimonials", params],
    queryFn: async () => {
      const response = await AdminService.getTestimonials(params);
      return response.data;
    },
  });

export const useApproveTestimonial = () =>
  useMutation<Testimonial, ApiErrorResponse, string>({
    mutationFn: async (_id: string) => {
      const response = await AdminService.approveTestimonial(_id);
      return response.data;
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: AdminService.deleteTestimonial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
};

export const useFetchSubscribers = (params?: { active?: boolean }) =>
  useQuery<ListResponse<Subscriber>, ApiErrorResponse>({
    queryKey: ["admin-subscribers", params],
    queryFn: async () => {
      const response = await AdminService.getSubscribers(params);
      return response.data;
    },
  });

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: AdminService.deleteSubscriber,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-subscribers"] }),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
};

export const useSendBulkEmail = () =>
  useMutation<
    { success: boolean; sentCount: number },
    ApiErrorResponse,
    BulkEmailData
  >({
    mutationFn: async (emailData: BulkEmailData) => {
      const response = await AdminService.sendBulkEmail(emailData);
      return response.data;
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useFetchContactMessages = (params?: { replied?: boolean }) =>
  useQuery<ListResponse<ContactMessage>, ApiErrorResponse>({
    queryKey: ["admin-contacts", params],
    queryFn: async () => {
      const response = await AdminService.getContactMessages(params);
      return response.data;
    },
  });

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: AdminService.deleteContactMessage,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
};

export const useReplyToContactMessage = () =>
  useMutation<
    { success: boolean },
    ApiErrorResponse,
    { _id: string; replyData: ContactReplyData }
  >({
    mutationFn: ({ _id, replyData }) =>
      AdminService.replyToContactMessage(_id, replyData),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
