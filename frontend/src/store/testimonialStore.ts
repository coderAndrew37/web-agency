import { create } from "zustand";
import { TestimonialService } from "../services/testimonialService";
import { Testimonial } from "../types/testimonial";

interface TestimonialState {
  testimonials: Testimonial[];
  adminTestimonials: Testimonial[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSubmitting: boolean;
  isSuccess: boolean;
  submit: (formData: FormData) => Promise<void>;
  fetchAll: () => Promise<void>;
  fetchAdmin: () => Promise<void>;
  approve: (_id: string) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => {
  // Memoized actions stored in closure
  const fetchAll = async () => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const res = await TestimonialService.getAll();
      set({ testimonials: res.data.data, isLoading: false });
    } catch (err) {
      set({
        isError: true,
        error:
          err instanceof Error ? err.message : "Failed to load testimonials",
        isLoading: false,
      });
    }
  };

  const fetchAdmin = async () => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const res = await TestimonialService.getAllAdmin();
      set({ adminTestimonials: res.data.data, isLoading: false });
    } catch (err) {
      set({
        isError: true,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load admin testimonials",
        isLoading: false,
      });
    }
  };

  const submit = async (formData: FormData) => {
    set({ isSubmitting: true, isSuccess: false, isError: false, error: null });
    try {
      await TestimonialService.submit(formData);
      set({ isSubmitting: false, isSuccess: true });
      await fetchAll();
    } catch (err) {
      set({
        isError: true,
        error: err instanceof Error ? err.message : "Submission failed",
        isSubmitting: false,
        isSuccess: false,
      });
    }
  };

  const approve = async (_id: string) => {
    try {
      await TestimonialService.approve(_id);
      await fetchAdmin();
    } catch (err) {
      console.error("Failed to approve testimonial:", err);
    }
  };

  const deleteTestimonial = async (_id: string) => {
    try {
      await TestimonialService.delete(_id);
      await fetchAdmin();
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  return {
    testimonials: [],
    adminTestimonials: [],
    isLoading: false,
    isError: false,
    error: null,
    isSubmitting: false,
    isSuccess: false,
    submit,
    fetchAll,
    fetchAdmin,
    approve,
    delete: deleteTestimonial,
  };
});
