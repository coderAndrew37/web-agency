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

// ✅ Send Bulk Email to Subscribers
export const sendBulkEmail = async (emailData: {
  subject: string;
  message: string;
}) => {
  return axiosInstance.post("/admin/subscribers/send-email", emailData);
};

/** ✅ Fetch Contact Messages */
export const fetchContactMessages = async () => {
  return axiosInstance.get("/admin/contacts");
};

/** ✅ Delete Contact Message */
export const deleteContactMessage = async (id: string) => {
  return axiosInstance.delete(`/admin/contacts/${id}`);
};
