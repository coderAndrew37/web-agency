import { createContext } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
