import axiosInstance from "./axiosInstance";

// ✅ Get admin dashboard stats
export const fetchAdminStats = async () => axiosInstance.get("/admin/stats");

// ✅ Fetch all users
export const fetchUsers = async () => axiosInstance.get("/admin/users");

// ✅ Update user role
export const updateUserRole = async (userId: string, role: string) =>
  axiosInstance.put(`/admin/users/${userId}/role`, { role });

// ✅ Delete user
export const deleteUser = async (userId: string) =>
  axiosInstance.delete(`/admin/users/${userId}`);

// ✅ Fetch all testimonials
export const fetchAllTestimonials = async () =>
  axiosInstance.get("/admin/testimonials");

// ✅ Approve testimonial
export const approveTestimonial = async (id: string) =>
  axiosInstance.put(`/admin/testimonials/${id}/approve`);

// ✅ Delete testimonial
export const deleteTestimonial = async (id: string) =>
  axiosInstance.delete(`/admin/testimonials/${id}`);

// ✅ Fetch all newsletter subscribers
export const fetchSubscribers = async () =>
  axiosInstance.get("/admin/subscribers");

// ✅ Delete subscriber
export const deleteSubscriber = async (id: string) =>
  axiosInstance.delete(`/admin/subscribers/${id}`);
