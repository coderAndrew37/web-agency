import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Create a custom interface that extends Express's Request
export interface AuthenticatedRequest extends Request {
  user?: typeof User.prototype;
}

const getToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
};

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req);
    if (!token) {
      res.status(401).json({ error: "Authorization token required" });
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
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Add new CSRF protection middleware
export const csrfProtect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const csrfToken = req.headers["x-csrf-token"];
    if (!csrfToken || typeof csrfToken !== "string") {
      res.status(403).json({ error: "CSRF token required" });
      return;
    }

    if (req.user.csrfToken !== csrfToken) {
      res.status(403).json({ error: "Invalid CSRF token" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "CSRF validation failed" });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await User.findById(decoded.userId).select("-password");
      if (user) req.user = user;
    }
    next();
  } catch {
    next();
  }
};

export const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
};
