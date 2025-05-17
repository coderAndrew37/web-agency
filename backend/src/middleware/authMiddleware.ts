import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: typeof User.prototype;
}

const getToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
};

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = getToken(req);
    if (!token) {
      res.status(401).json({ error: "Authorization token required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    User.findById(decoded.userId)
      .select("-password")
      .then((user) => {
        if (!user) {
          res.status(401).json({ error: "User not found" });
          return;
        }

        req.user = user;
        next();
      })
      .catch(() => {
        res.status(401).json({ error: "Invalid user data" });
      });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const csrfProtect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
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
  } catch {
    res.status(500).json({ error: "CSRF validation failed" });
  }
};

export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = getToken(req);
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    User.findById(decoded.userId)
      .select("-password")
      .then((user) => {
        if (user) req.user = user;
        next();
      })
      .catch(() => next());
  } catch {
    next();
  }
};

export const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: "Authentication required",
      });
      return;
    }

    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        error: "Admin access required",
      });
      return;
    }

    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      const csrfToken = req.headers["x-csrf-token"];
      if (!csrfToken || typeof csrfToken !== "string") {
        res.status(403).json({ error: "CSRF token required" });
        return;
      }

      if (req.user.csrfToken !== csrfToken) {
        res.status(403).json({ error: "Invalid CSRF token" });
        return;
      }
    }

    next();
  } catch {
    res.status(500).json({
      success: false,
      error: "Authorization check failed",
    });
  }
};
