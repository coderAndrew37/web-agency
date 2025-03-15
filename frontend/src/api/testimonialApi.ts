import axiosInstance from "./axiosInstance";

export const submitTestimonial = async (data: FormData) => {
  return axiosInstance.post("/testimonials", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchTestimonials = async () => {
  const response = await axiosInstance.get("/testimonials");
  return response.data; // ✅ Ensure correct data is returned
};
