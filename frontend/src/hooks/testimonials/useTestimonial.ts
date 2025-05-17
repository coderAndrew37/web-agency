import { useEffect, useRef } from "react";
import { useTestimonialStore } from "../../store/testimonialStore";

export const useTestimonials = (autoFetch = true) => {
  const testimonials = useTestimonialStore((s) => s.testimonials);
  const isLoading = useTestimonialStore((s) => s.isLoading);
  const isError = useTestimonialStore((s) => s.isError);
  const error = useTestimonialStore((s) => s.error);
  const fetchAllRef = useRef(useTestimonialStore.getState().fetchAll);

  useEffect(() => {
    if (autoFetch && testimonials.length === 0 && !isLoading) {
      fetchAllRef.current();
    }
  }, [autoFetch, testimonials.length, isLoading]);

  return { testimonials, isLoading, isError, error };
};

export const useSubmitTestimonial = () => {
  const submit = useTestimonialStore((s) => s.submit);
  const isSubmitting = useTestimonialStore((s) => s.isSubmitting);
  const isSuccess = useTestimonialStore((s) => s.isSuccess);
  const isError = useTestimonialStore((s) => s.isError);
  const error = useTestimonialStore((s) => s.error);

  return { submit, isSubmitting, isSuccess, isError, error };
};

export const useAdminTestimonials = () => {
  const adminTestimonials = useTestimonialStore((s) => s.adminTestimonials);
  const isLoading = useTestimonialStore((s) => s.isLoading);
  const isError = useTestimonialStore((s) => s.isError);
  const error = useTestimonialStore((s) => s.error);
  const fetchAdmin = useTestimonialStore((s) => s.fetchAdmin);
  const approve = useTestimonialStore((s) => s.approve);
  const deleteTestimonial = useTestimonialStore((s) => s.delete);

  return {
    adminTestimonials,
    isLoading,
    isError,
    error,
    fetchAdmin,
    approve,
    delete: deleteTestimonial,
  };
};
