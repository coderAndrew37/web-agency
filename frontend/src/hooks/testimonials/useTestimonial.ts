import { useTestimonialStore } from "../../store/testimonialStore";
import { useEffect } from "react";

// Main hook that handles both data and auto-fetching
export const useTestimonials = (autoFetch = true) => {
  const { testimonials, isLoading, isError, error, fetchAll } =
    useTestimonialStore((state) => ({
      testimonials: state.testimonials,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      fetchAll: state.fetchAll,
    }));

  useEffect(() => {
    if (autoFetch && testimonials.length === 0 && !isLoading) {
      fetchAll();
    }
  }, [autoFetch, testimonials.length, isLoading, fetchAll]);

  return { testimonials, isLoading, isError, error, fetchAll };
};

// Keep other hooks the same as before
export const useSubmitTestimonial = () => {
  return useTestimonialStore((state) => ({
    submit: state.submit,
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
  }));
};

export const useAdminTestimonials = () => {
  return useTestimonialStore((state) => ({
    adminTestimonials: state.adminTestimonials,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    fetchAdmin: state.fetchAdmin,
    approve: state.approve,
    delete: state.delete,
  }));
};
