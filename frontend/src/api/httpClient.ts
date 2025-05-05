// api/httpClient.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface BaseApiResponse<T = unknown> {
  data: T;
  csrfToken?: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  csrfToken?: string;
}

class HttpClient {
  private instance: AxiosInstance;
  private csrfToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeCsrfToken();
    this.setupInterceptors();
  }

  private initializeCsrfToken(): void {
    if (typeof window !== "undefined") {
      this.csrfToken = localStorage.getItem("csrfToken");
    }
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.handleRequest(config),
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => this.handleResponse(response),
      (error: AxiosError) => this.handleError(error)
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    if (
      this.csrfToken &&
      ["post", "put", "patch", "delete"].includes(
        config.method?.toLowerCase() || ""
      )
    ) {
      config.headers = config.headers || {};
      config.headers["X-CSRF-Token"] = this.csrfToken;
    }
    return config;
  }

  private handleResponse<T>(
    response: AxiosResponse<BaseApiResponse<T>>
  ): AxiosResponse<T> {
    const newCsrfToken = response.data.csrfToken;
    if (newCsrfToken) {
      this.setCsrfToken(newCsrfToken);
    }
    return {
      ...response,
      data: response.data.data,
    };
  }

  private async handleError(error: AxiosError): Promise<never> {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await this.handleTokenRefresh();
        if (newAccessToken) {
          return this.instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        this.clearCsrfToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (!this.refreshPromise) {
      this.refreshPromise = new Promise<string>((resolve, reject) => {
        this.instance
          .post<RefreshTokenResponse>("/auth/refresh")
          .then((response) => {
            if (response.data.csrfToken) {
              this.setCsrfToken(response.data.csrfToken);
            }
            resolve(response.data.accessToken);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.refreshPromise = null;
          });
      });
    }
    return this.refreshPromise;
  }

  public setCsrfToken(token: string): void {
    this.csrfToken = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("csrfToken", token);
    }
  }

  public clearCsrfToken(): void {
    this.csrfToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("csrfToken");
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .get<BaseApiResponse<T>>(url, config)
      .then((response) => response.data.data);
  }

  public post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .post<BaseApiResponse<T>>(url, data, config)
      .then((response) => response.data.data);
  }

  public put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .put<BaseApiResponse<T>>(url, data, config)
      .then((response) => response.data.data);
  }

  public patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .patch<BaseApiResponse<T>>(url, data, config)
      .then((response) => response.data.data);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .delete<BaseApiResponse<T>>(url, config)
      .then((response) => response.data.data);
  }
}

// Create instance with environment variable
export const apiClient = new HttpClient(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
);
