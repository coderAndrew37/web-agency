import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// ✅ Extend Request to Include User Property
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// ✅ Extract Token from Headers or Cookies
const getToken = (req: Request): string | null => {
  if (req.cookies?.accessToken) return req.cookies.accessToken;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

// ✅ Protect Routes Middleware (Requires Auth)
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = getToken(req);
    if (!token) {
      res.status(401).json({ error: "Unauthorized, no token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token or expired session" });
  }
};

// ✅ Optional Auth Middleware (Attaches User If Logged In)
export const optionalAuth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = getToken(req);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await User.findById(decoded.userId).select("-password");
      if (user) req.user = user;
    }
  } catch (error) {
    // Do nothing, user stays unauthenticated
  }
  next();
};

// ✅ Admin Middleware (Requires Auth & Admin Role)
export const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Not authorized as admin" });
    return;
  }
  next();
};
