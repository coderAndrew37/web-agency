import axiosInstance from "./axiosInstance";

// ✅ Submit Contact Form
export const submitContactForm = async (contactData: {
  name: string;
  email: string;
  message: string;
}) => {
  return axiosInstance.post("/contact", contactData);
};

// ✅ Fetch Contact Messages (Admin Only)
export const fetchContactMessages = async () => {
  return axiosInstance.get("/contact");
};
