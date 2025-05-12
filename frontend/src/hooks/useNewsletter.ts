import { useMutation } from "@tanstack/react-query";
import {
  newsletterService,
  SubscribePayload,
} from "../services/newsletterService";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
});

type SubscribeResponse = z.infer<typeof responseSchema>;

export const useSubscribeNewsletter = () => {
  return useMutation<SubscribeResponse, Error, SubscribePayload>({
    mutationFn: async (payload) => {
      const response = await newsletterService.subscribe(payload);
      const parsed = responseSchema.safeParse(response);

      if (!parsed.success) {
        throw new Error("Invalid response format from server");
      }

      return parsed.data;
    },
  });
};
