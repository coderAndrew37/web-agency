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
  email: string;
  role: string;
  isVerified: boolean;
};

export type AuthResponse = {
  user: User;
  isAuthenticated: boolean;
  csrfToken?: string;
};

export type RefreshTokenResponse = {
  accessToken: string | null;
  csrfToken: string | null;
};

export type VerifyData = {
  email: string;
  code: string;
};
