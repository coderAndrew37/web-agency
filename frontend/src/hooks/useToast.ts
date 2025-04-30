import { useToastStore } from "../store/toastStore";

export const useToast = () => {
  return useToastStore((state) => ({
    toasts: state.toasts,
    showToast: state.showToast,
    removeToast: state.removeToast,
  }));
};

// Convenience methods
export const useToastHelpers = () => {
  const { showToast } = useToastStore.getState();

  return {
    showSuccess: (message: string) => showToast(message, "success"),
    showError: (message: string) => showToast(message, "error"),
    showInfo: (message: string) => showToast(message, "info"),
  };
};
