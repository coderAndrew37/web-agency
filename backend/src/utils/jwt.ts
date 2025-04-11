import jwt from "jsonwebtoken";

// 1. Define JWT payload types
interface BaseJwtPayload {
  iat?: number; // Issued at (automatic)
  exp?: number; // Expiration (automatic)
}

interface AccessTokenPayload extends BaseJwtPayload {
  userId: string;
  tokenType: 'access';
}

interface RefreshTokenPayload extends BaseJwtPayload {
  userId: string;
  tokenType: 'refresh';
}

// 2. Validate environment variables immediately
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets are missing in environment variables");
}

// 3. Token generation functions
export const generateAccessToken = (userId: string): string => {
  const payload: AccessTokenPayload = {
    userId,
    tokenType: 'access'
  };
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
  const payload: RefreshTokenPayload = {
    userId,
    tokenType: 'refresh'
  };
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

// 4. Type-safe verification with proper error handling
export const verifyToken = <T extends BaseJwtPayload = AccessTokenPayload>(
  token: string,
  secret: string
): T => {
  try {
    const payload = jwt.verify(token, secret);
    
    // Runtime type checking for extra safety
    if (typeof payload !== 'object' || payload === null) {
      throw new Error("Invalid token payload");
    }
    
    return payload as T;
  } catch (error) {
    // Convert to a standardized error format
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw new Error("Token verification failed");
  }
};

// 5. Convenience functions for specific token types
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return verifyToken<AccessTokenPayload>(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return verifyToken<RefreshTokenPayload>(token, REFRESH_SECRET);
};