// src/utils/tokenManager.ts
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken, verifyToken } from "./jwt";

// ✅ Create both access and refresh tokens
export const createTokens = (userId: string) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

// ✅ Set tokens as HTTP-only cookies with proper security settings
export const setTokensAsCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: process.env.COOKIE_DOMAIN,
    path: "/api/auth/refresh",
  });
};

// ✅ Middleware already handles rate limiting — no manual check required
export const isTokenRefreshRateLimited = (_req: Request): boolean => {
  return false;
};

// ✅ Clear authentication cookies
export const clearAuthCookies = (res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN,
    path: "/api/auth/refresh",
  });
};

// ✅ Verify refresh token and get user ID
export const verifyRefreshToken = (token: string): string | null => {
  try {
    const decoded = verifyToken(token, process.env.REFRESH_SECRET!) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
