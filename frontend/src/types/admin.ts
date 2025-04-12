import { AxiosError } from "axios";

/* ──────── 📦 Core Models ──────── */
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  createdAt: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  message: string;
  image?: string;
  approved: boolean;
  createdAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  isActive?: boolean;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  isReplied?: boolean;
  createdAt: string;
}

/* ──────── 📊 Admin Stats ──────── */
export interface AdminStats {
  users: number;
  activeUsers: number;
  testimonials: number;
  pendingTestimonials: number;
  subscribers: number;
  unreadMessages: number;
}

/* ──────── ✅ Generic Response Types ──────── */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/* ──────── ❌ Error Types ──────── */
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  validationErrors?: Record<string, string>;
}

export type ApiErrorResponse = AxiosError<ApiError>;

/* ──────── 🧰 Utility Types ──────── */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, string | number | boolean>;
}

export interface BulkEmailData {
  subject: string;
  message: string;
  templateId?: string;
}

export interface ContactReplyData {
  subject: string;
  message: string;
}
