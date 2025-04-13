import { AxiosError } from "axios";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiErrorResponse = AxiosError<{
  success: false;
  message: string;
  errors?: Record<string, string>;
  statusCode?: number;
}>;
