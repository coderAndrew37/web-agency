export type LeadCaptureData = {
  email: string;
  name: string;
  resourceType: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  statusCode?: number;
  errors?: Record<string, string>;
};
