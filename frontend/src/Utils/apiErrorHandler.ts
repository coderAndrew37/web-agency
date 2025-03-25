// src/utils/apiErrorHandler.ts
import { AxiosError } from "axios";
import { ApiErrorResponse, ApiError } from "../types/admin";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

/**
 * Handles API errors consistently across the application
 * @param error The error object
 * @param context Additional context for error handling
 */
export const handleApiError = (
  error: unknown,
  context?: {
    showToast?: boolean;
    customMessage?: string;
  }
): ApiError => {
  const defaultError: ApiError = {
    statusCode: 500,
    message: "An unexpected error occurred",
  };

  // Handle Axios errors
  if (isAxiosError(error)) {
    const axiosError = error as ApiErrorResponse;
    const apiError = axiosError.response?.data || defaultError;

    if (context?.showToast) {
      toast.error(context.customMessage || apiError.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }

    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error Details:", {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config,
      });
    }

    return apiError;
  }

  // Handle generic errors
  if (error instanceof Error) {
    if (context?.showToast) {
      toast.error(context.customMessage || error.message);
    }
    return {
      ...defaultError,
      message: error.message,
    };
  }

  // Fallback for unknown error types
  if (context?.showToast) {
    toast.error(context.customMessage || defaultError.message);
  }
  return defaultError;
};

/**
 * Type guard for Axios errors
 */
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

/**
 * Handles validation errors from API responses
 */
export const handleValidationErrors = (
  errors: Record<string, string>
): string => {
  return Object.values(errors).join("\n");
};

/**
 * Creates consistent error messages for the UI
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Something went wrong"
): string => {
  if (isAxiosError(error)) {
    return (
      (error as ApiErrorResponse).response?.data?.message || defaultMessage
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
