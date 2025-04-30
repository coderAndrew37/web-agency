import jwt from "jsonwebtoken";

// Environment validation
const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets must be defined in environment");
}

// Token interfaces
interface AccessTokenPayload {
  userId: string;
  tokenType: "access";
}

interface RefreshTokenPayload {
  userId: string;
  tokenType: "refresh";
}

// Token generation
export const generateAccessToken = (userId: string) =>
  jwt.sign({ userId, tokenType: "access" }, ACCESS_SECRET, {
    expiresIn: "15m",
  });

export const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId, tokenType: "refresh" }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

// Token verification
const verifyToken = <T>(token: string, secret: string): T => {
  const payload = jwt.verify(token, secret) as T | null;

  if (!payload || typeof payload !== "object" || !("userId" in payload)) {
    throw new Error("Invalid token payload");
  }

  return payload;
};

export const verifyAccessToken = (token: string) =>
  verifyToken<AccessTokenPayload>(token, ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  verifyToken<RefreshTokenPayload>(token, REFRESH_SECRET);
