export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string>;
  statusCode?: number;
};
