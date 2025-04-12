import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Generic, reusable HTTP client with full typing
class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .get<T>(url, config)
      .then((res: AxiosResponse<T>) => res.data);
  }

  post<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .post<T>(url, data, config)
      .then((res: AxiosResponse<T>) => res.data);
  }

  put<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .put<T>(url, data, config)
      .then((res: AxiosResponse<T>) => res.data);
  }

  patch<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .patch<T>(url, data, config)
      .then((res: AxiosResponse<T>) => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .delete<T>(url, config)
      .then((res: AxiosResponse<T>) => res.data);
  }
}

// ✅ Provide type-safe client to rest of app
export const apiClient = new HttpClient(
  import.meta.env.VITE_API_BASE_URL as string
);
