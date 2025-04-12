import { z } from "zod";

export const clientSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  servicesInterested: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  budget: z.number().min(100, "Budget must be at least $100"),
  message: z.string().optional(),
});

export type ClientData = z.infer<typeof clientSchema>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// Add this error response type
export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string>;
  statusCode?: number;
};
