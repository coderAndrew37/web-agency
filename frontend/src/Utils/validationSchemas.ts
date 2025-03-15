import { z } from "zod";

// ✅ Register Form Schema
export const registerSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Login Form Schema
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Testimonial Validation Schema
export const testimonialSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      {
        message: "Image size must be under 2MB",
      }
    ),
});
