export type BaseApiResponse<T = unknown> = {
  success: boolean;
  data: T;
  message?: string;
  csrfToken?: string; // Optional CSRF token at wrapper level
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isVerified: boolean;
};

export type AuthTokens = {
  accessToken?: string;
  refreshToken?: string;
};

export type AuthStateResponse = {
  isAuthenticated: boolean;
  csrfToken?: string; // Make optional to match backend
  user: User | null; // Nullable to match backend
};

// Update AuthResponse to match
export type AuthResponse = {
  user: User | null;
  isAuthenticated: boolean;
  csrfToken?: string;
  accessToken?: string;
};

// For refresh token endpoint
export type RefreshTokenResponse = {
  accessToken: string | null;
  csrfToken: string | null;
  user?: User | null;
};

export type VerifyData = {
  email: string;
  code: string;
};
