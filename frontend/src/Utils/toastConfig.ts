// src/utils/toastConfig.ts
import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 8000, // Longer display for errors
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
  });
};

export const updateToast = (
  id: string,
  message: string,
  type: "success" | "error"
) => {
  toast.update(id, {
    render: message,
    type,
    isLoading: false,
    autoClose: 5000,
  });
};
