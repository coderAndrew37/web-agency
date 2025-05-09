import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "../../services/adminService";
import {
  AdminStats,
  ApiErrorResponse,
  BulkEmailData,
  ContactMessage,
  ContactReplyData,
  ListResponse,
  Subscriber,
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
