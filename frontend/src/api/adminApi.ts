import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Fetch Admin Dashboard Stats
export const useFetchAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/stats");
      return data;
    },
  });
};

// ✅ Fetch All Users
export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/users");
      return data;
    },
  });
};

// ✅ Update User Role
export const useUpdateUserRole = () => {
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return axiosInstance.put(`/admin/users/${userId}/role`, { role });
    },
  });
};

// ✅ Delete User
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: string) =>
      axiosInstance.delete(`/admin/users/${userId}`),
  });
};

// ✅ Fetch All Testimonials
export const useFetchAllTestimonials = () => {
  return useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/testimonials");
      return data;
    },
  });
};

// ✅ Approve Testimonial
export const useApproveTestimonial = () => {
  return useMutation({
    mutationFn: async (id: string) =>
      axiosInstance.put(`/admin/testimonials/${id}/approve`),
  });
};

// ✅ Delete Testimonial
export const useDeleteTestimonial = () => {
  return useMutation({
    mutationFn: async (id: string) =>
      axiosInstance.delete(`/admin/testimonials/${id}`),
  });
};

// ✅ Fetch Newsletter Subscribers
export const useFetchSubscribers = () => {
  return useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/subscribers");
      return data;
    },
  });
};

// ✅ Delete Subscriber
export const useDeleteSubscriber = () => {
  return useMutation({
    mutationFn: async (id: string) =>
      axiosInstance.delete(`/admin/subscribers/${id}`),
  });
};

// ✅ Send Bulk Email to Subscribers
export const useSendBulkEmail = () => {
  return useMutation({
    mutationFn: async (emailData: { subject: string; message: string }) => {
      return axiosInstance.post("/admin/subscribers/send-email", emailData);
    },
  });
};

// ✅ Fetch Contact Messages
export const useFetchContactMessages = () => {
  return useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/contacts");
      return data;
    },
  });
};

// ✅ Delete Contact Message
export const useDeleteContactMessage = () => {
  return useMutation({
    mutationFn: async (id: string) =>
      axiosInstance.delete(`/admin/contacts/${id}`),
  });
};

// ✅ Reply to Contact Message
export const useReplyToContactMessage = () => {
  return useMutation({
    mutationFn: async ({
      id,
      replyData,
    }: {
      id: string;
      replyData: { subject: string; message: string };
    }) => {
      return axiosInstance.post(`/contacts/${id}/reply`, replyData);
    },
  });
};
