import crypto from "crypto";
import { Request } from "express";

// Generate CSRF Token
export const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Verify CSRF Token
export const verifyCSRFToken = (req: Request) => {
  const csrfCookie = req.cookies["XSRF-TOKEN"];
  const csrfHeader = req.headers["x-xsrf-token"];
  return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
};
