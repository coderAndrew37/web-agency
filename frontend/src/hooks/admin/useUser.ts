import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "../../services/adminService";
import {
  User,
  ListResponse,
  ApiErrorResponse,
  QueryParams,
} from "../../types/admin";
import { handleApiError } from "../../Utils/apiErrorHandler";

export const useFetchUsers = (params?: QueryParams) =>
  useQuery<ListResponse<User>, ApiErrorResponse>({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const response = await AdminService.getUsers(params);
      return response; // ✅ unwraps ListResponse<User>
    },
  });

export const useUpdateUserRole = () =>
  useMutation<User, ApiErrorResponse, { _id: string; role: User["role"] }>({
    mutationFn: async ({ _id, role }) => {
      const response = await AdminService.updateUserRole(_id, role);
      return response; // ✅ unwraps User
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, ApiErrorResponse, string>({
    mutationFn: async (_id: string) => {
      const response = await AdminService.deleteUser(_id);
      return response; // ✅ unwraps success
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    onError: (error) => handleApiError(error, { showToast: true }),
  });
};

export const useToggleUserStatus = () =>
  useMutation<User, ApiErrorResponse, { _id: string; isActive: boolean }>({
    mutationFn: async ({ _id, isActive }) => {
      const response = await AdminService.toggleUserStatus(_id, isActive);
      return response; // ✅ unwraps User
    },
    onError: (error) => handleApiError(error, { showToast: true }),
  });

export const useGetUser = (_id: string) =>
  useQuery<User, ApiErrorResponse>({
    queryKey: ["admin-user", _id],
    queryFn: async () => {
      const response = await AdminService.getUserById(_id);
      return response; // ✅ unwraps User
    },
    enabled: !!_id,
  });
