import { useMutation } from "@tanstack/react-query";
import { LeadMagnetService } from "../../services/leadMagnetService";
import { LeadCaptureData, ApiErrorResponse } from "../../types/leadMagnet";

export const useCaptureLead = () =>
  useMutation<{ success: boolean }, ApiErrorResponse, LeadCaptureData>({
    mutationFn: (data) =>
      LeadMagnetService.capture(data).then((res) => res.data),
  });
