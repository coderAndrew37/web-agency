// src/services/leadMagnetService.ts
import { apiClient } from "../api/httpClient";
import { LeadCaptureData } from "../types/leadMagnet";
import { ApiResponse } from "../types/api";

export const LeadMagnetService = {
  capture: (data: LeadCaptureData) =>
    apiClient.post<ApiResponse<{ success: boolean }>, LeadCaptureData>(
      "/lead-magnet",
      data
    ),
};
