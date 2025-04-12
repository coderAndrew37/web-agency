// hooks/auth/useRefreshSession.ts
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../../services/authService";
import { User } from "../../types/authTypes";
import { toast } from "react-toastify";
export const useRefreshSession = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let retries = 0;

    const hydrateUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        queryClient.setQueryData<User>(["currentUser"], user);
      } catch {
        try {
          await AuthService.refresh();
          const user = await AuthService.getCurrentUser();
          queryClient.setQueryData<User>(["currentUser"], user);
        } catch {
          if (retries < 1) {
            retries += 1;
            setTimeout(hydrateUser, 1000); // retry once
          } else {
            toast.warning("Session expired. Please log in again.");
            queryClient.setQueryData(["currentUser"], null);
          }
        }
      }
    };

    hydrateUser();
  }, [queryClient]);
};
