import { useToastStore } from "../store/toastStore";

export const useToast = () => {
  const toasts = useToastStore((s) => s.toasts);
  const showToast = useToastStore((s) => s.showToast);
  const removeToast = useToastStore((s) => s.removeToast);

  return { toasts, showToast, removeToast };
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
