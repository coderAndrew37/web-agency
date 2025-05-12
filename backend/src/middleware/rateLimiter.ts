import rateLimit from "express-rate-limit";

// ✅ General API Rate Limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 10000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// ✅ OTP Request Throttle Middleware
export const otpRequestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // limit each IP/email to 3 OTP requests
  message: "Too many OTP requests. Please try again after 10 minutes.",
});

export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit to 20 requests per window
  message: { error: "Too many refresh attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const bookingRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 booking requests per window
  message: {
    error: "Too many booking attempts from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
