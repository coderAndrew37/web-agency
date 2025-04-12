import { useMutation } from "@tanstack/react-query";
import { ClientService } from "../services/clientService";
import { ClientData, ApiErrorResponse } from "../types/client";

export const useSubmitClientForm = () => {
  return useMutation<{ message: string }, ApiErrorResponse, ClientData>({
    mutationFn: (data) =>
      ClientService.submitOnboarding(data).then((res) => res.data),
  });
};
