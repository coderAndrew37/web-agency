import { useQuery, useMutation } from "@tanstack/react-query";
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

// ✅ Stats
export const useAdminStats = () =>
  useQuery<AdminStats, ApiErrorResponse>({
    queryKey: ["admin-stats"],
    queryFn: async () => (await AdminService.getStats()).data,
    staleTime: 5 * 60 * 1000,
  });

// ✅ Users
export const useFetchUsers = (params?: QueryParams) =>
  useQuery<ListResponse<User>, ApiErrorResponse>({
    queryKey: ["admin-users", params],
    queryFn: async () => (await AdminService.getUsers(params)).data,
  });

export const useUpdateUserRole = () =>
  useMutation<User, ApiErrorResponse, { _id: string; role: User["role"] }>({
    mutationFn: ({ _id, role }) =>
      AdminService.updateUserRole(_id, role).then((res) => res.data),
  });

export const useDeleteUser = () =>
  useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: (_id) => AdminService.deleteUser(_id).then((res) => res.data),
  });

export const useToggleUserStatus = () =>
  useMutation<User, ApiErrorResponse, { _id: string; isActive: boolean }>({
    mutationFn: ({ _id, isActive }) =>
      AdminService.toggleUserStatus(_id, isActive).then((res) => res.data),
  });

export const useGetUser = (_id: string) =>
  useQuery<User, ApiErrorResponse>({
    queryKey: ["admin-user", _id],
    queryFn: async () => (await AdminService.getUserById(_id)).data,
    enabled: !!_id,
  });

// ✅ Testimonials
export const useFetchTestimonials = (params?: { approved?: boolean }) =>
  useQuery<ListResponse<Testimonial>, ApiErrorResponse>({
    queryKey: ["admin-testimonials", params],
    queryFn: async () => (await AdminService.getTestimonials(params)).data,
  });

export const useApproveTestimonial = () =>
  useMutation<Testimonial, ApiErrorResponse, string>({
    mutationFn: (_id) =>
      AdminService.approveTestimonial(_id).then((res) => res.data),
  });

export const useDeleteTestimonial = () =>
  useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: (_id) =>
      AdminService.deleteTestimonial(_id).then((res) => res.data),
  });

// ✅ Subscribers
export const useFetchSubscribers = (params?: { active?: boolean }) =>
  useQuery<ListResponse<Subscriber>, ApiErrorResponse>({
    queryKey: ["admin-subscribers", params],
    queryFn: async () => (await AdminService.getSubscribers(params)).data,
  });

export const useDeleteSubscriber = () =>
  useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: (_id) =>
      AdminService.deleteSubscriber(_id).then((res) => res.data),
  });

export const useSendBulkEmail = () =>
  useMutation<
    { success: boolean; sentCount: number },
    ApiErrorResponse,
    BulkEmailData
  >({
    mutationFn: (data) =>
      AdminService.sendBulkEmail(data).then((res) => res.data),
  });

// ✅ Contact Messages
export const useFetchContactMessages = (params?: { replied?: boolean }) =>
  useQuery<ListResponse<ContactMessage>, ApiErrorResponse>({
    queryKey: ["admin-contacts", params],
    queryFn: async () => (await AdminService.getContactMessages(params)).data,
  });

export const useDeleteContactMessage = () =>
  useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: (_id) =>
      AdminService.deleteContactMessage(_id).then((res) => res.data),
  });

export const useReplyToContactMessage = () =>
  useMutation<
    { success: boolean },
    ApiErrorResponse,
    { _id: string; replyData: ContactReplyData }
  >({
    mutationFn: ({ _id, replyData }) =>
      AdminService.replyToContactMessage(_id, replyData).then(
        (res) => res.data
      ),
  });
