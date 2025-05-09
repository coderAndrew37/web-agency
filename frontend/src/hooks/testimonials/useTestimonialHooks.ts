// ✅ hooks/useTestimonial.ts
import { useTestimonialStore } from "../../store/testimonialStore";

export const useTestimonials = () => {
  return useTestimonialStore((state) => ({
    testimonials: state.testimonials,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    fetchAll: state.fetchAll,
  }));
};

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
    testimonials: state.testimonials,
    fetchAll: state.fetchAll,
    approve: state.approve,
    delete: state.delete,
  }));
};
