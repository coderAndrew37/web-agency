import { Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./jwt";

// Token expiration constants
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export const createTokens = (userId: string) => ({
  accessToken: generateAccessToken(userId),
  refreshToken: generateRefreshToken(userId),
});

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    path: "/api/auth/refresh",
    domain: process.env.COOKIE_DOMAIN,
  });
};

export const clearAuthCookies = (res: Response) => {
  const cookieOptions = {
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", {
    ...cookieOptions,
    path: "/api/auth/refresh",
  });
};

export const validateRefreshToken = (token: string) => {
  try {
    const { userId } = verifyRefreshToken(token);
    return userId;
  } catch (error) {
    return null;
  }
};
