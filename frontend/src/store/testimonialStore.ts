import { create } from "zustand";
import { TestimonialService } from "../services/testimonialService";
import { Testimonial } from "../types/testimonial";

interface TestimonialState {
  testimonials: Testimonial[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSubmitting: boolean;
  isSuccess: boolean;
  submit: (formData: FormData) => Promise<void>;
  fetchAll: () => Promise<void>;
  approve: (_id: string) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  isError: false,
  error: null,
  isSubmitting: false,
  isSuccess: false,

  fetchAll: async () => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const res = await TestimonialService.getAll();
      set({ testimonials: res.data, isLoading: false });
    } catch (err) {
      set({
        isError: true,
        error:
          err instanceof Error ? err.message : "Failed to load testimonials",
        isLoading: false,
      });
    }
  },

  submit: async (formData) => {
    set({ isSubmitting: true, isSuccess: false, isError: false, error: null });
    try {
      await TestimonialService.submit(formData);
      set({ isSubmitting: false, isSuccess: true });
      get().fetchAll();
    } catch (err) {
      set({
        isError: true,
        error: err instanceof Error ? err.message : "Submission failed",
        isSubmitting: false,
        isSuccess: false,
      });
    }
  },

  approve: async (_id) => {
    try {
      await TestimonialService.approve(_id);
      get().fetchAll();
    } catch (err) {
      console.error("Failed to approve testimonial:", err);
    }
  },

  delete: async (_id) => {
    try {
      await TestimonialService.delete(_id);
      get().fetchAll();
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  },
}));
