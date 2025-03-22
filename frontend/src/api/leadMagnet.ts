import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Capture Lead API Hook
export const useCaptureLead = () => {
  return useMutation({
    mutationFn: async (data: {
      email: string;
      name: string;
      resourceType: string;
    }) => {
      return axiosInstance.post("/lead-magnet", data);
    },
  });
};
