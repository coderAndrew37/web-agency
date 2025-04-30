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
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

export type AuthResponse = {
  user: User;
  accessToken?: string;
  csrfToken?: string;
};
export type RefreshTokenResponse = {
  accessToken: string;
  csrfToken?: string;
};

export type VerifyData = {
  email: string;
  code: string;
};
