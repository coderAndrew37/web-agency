import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.get<T>(url, config);
    return data;
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data: responseData } = await this.instance.post<T>(
      url,
      data,
      config
    );
    return responseData;
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data: responseData } = await this.instance.put<T>(
      url,
      data,
      config
    );
    return responseData;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.delete<T>(url, config);
    return data;
  }
}

export const apiClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
