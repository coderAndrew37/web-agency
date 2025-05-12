import { apiClient } from "../api/httpClient";

export interface BookingPayload {
  name: string;
  email: string;
  selectedPlan: string;
  description: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  selectedPlan: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

interface BookingListResponse {
  success: boolean;
  count: number;
  bookings: Booking[];
}

interface BookingDetailResponse {
  success: boolean;
  booking: Booking;
}

interface BookingCreateResponse {
  success: boolean;
  message: string;
  booking: Booking;
}

interface BookingUpdateResponse {
  success: boolean;
  message: string;
  booking: Booking;
}

export const bookingService = {
  create: (data: BookingPayload) =>
    apiClient.post<BookingCreateResponse>("/bookings", data),

  getAll: () => apiClient.get<BookingListResponse>("/bookings"),

  getById: (id: string) =>
    apiClient.get<BookingDetailResponse>(`/bookings/${id}`),

  updateStatus: (id: string, status: Booking["status"]) =>
    apiClient.put<BookingUpdateResponse>(`/bookings/${id}/status`, { status }),

  delete: (id: string) =>
    apiClient.delete<{ success: boolean; message: string }>(`/bookings/${id}`),
};
