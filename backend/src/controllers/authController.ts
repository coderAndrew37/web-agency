import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import ms from "ms";
import OTP from "../models/otp";
import crypto from "crypto";
import RefreshTokenBlacklist from "../models/RefreshTokenBlacklist";
import User, { IUser, validateUser } from "../models/User";
import { sendEmail } from "../utils/emailService";
import { generateOTP } from "../utils/generateOtp";
import {
  clearAuthCookies,
  createTokens,
  setRefreshTokenCookie,
  validateRefreshToken,
} from "../utils/tokenManager";

const buildAuthState = (user?: IUser | null, csrfToken?: string) => ({
  isAuthenticated: !!user,
  isVerified: user?.isVerified ?? false,
  userId: user?._id ?? null,
  email: user?.email ?? null,
  role: user?.role ?? "guest",
  csrfToken,
});

interface AuthenticatedRequest extends Request {
  user?: IUser;
  headers: {
    "x-csrf-token"?: string;
  } & Request["headers"];
}

// Response handlers
const sendError = (
  res: Response,
  status: number,
  message: string,
  details?: object
) => {
  res.status(status).json({ success: false, error: message, ...details });
};

const sendSuccess = (res: Response, data: object, statusCode = 200) => {
  res.status(statusCode).json({ success: true, ...data });
};

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return sendError(res, 400, "Validation failed", {
        errors: error.details.map((d) => d.message),
      });
    }

    const { name, email, password } = req.body;

    if (await User.exists({ email })) {
      return sendError(res, 409, "Email already registered");
    }

    const user = await new User({ name, email, password }).save();
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.findOneAndUpdate(
      { email },
      {
        code: hashedOtp,
        createdAt: new Date(),
        attempts: 0,
        expiresAt: new Date(Date.now() + ms("15m")),
      },
      { upsert: true }
    );

    await sendEmail(
      email,
      "Kindly verify your account",
      `Your verification code is: <strong>${otp}</strong> (expires in 15 minutes)`
    );

    sendSuccess(
      res,
      {
        message: "Account created. Check your email for the OTP.",
        email,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    sendError(res, 500, "Registration failed");
  }
};

// Verify user email with OTP
export const verify = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return sendError(res, 400, "Email and OTP required");
    }

    const otpDoc = await OTP.findOne({
      email,
      expiresAt: { $gt: new Date() }, // ✅ Proper expiry check
    });

    if (!otpDoc?.code) {
      return sendError(res, 400, "OTP expired/invalid", { codeExpired: true });
    }

    if ((otpDoc.attempts ?? 0) >= 5) {
      return sendError(res, 429, "Too many attempts. Request new OTP");
    }

    const isMatch = await bcrypt.compare(code, otpDoc.code);
    if (!isMatch) {
      await OTP.updateOne({ email }, { $inc: { attempts: 1 } });
      return sendError(res, 400, "Invalid OTP", {
        attemptsRemaining: 5 - ((otpDoc.attempts ?? 0) + 1),
      });
    }

    await OTP.deleteOne({ email });

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true, verifiedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const { accessToken, refreshToken } = createTokens(user._id.toString());
    const csrfToken = crypto.randomBytes(32).toString("hex");
    user.csrfToken = csrfToken;
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    await sendEmail(
      email,
      "Account Verified",
      "Welcome! Your account has been verified."
    );

    sendSuccess(res, {
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      isAuthenticated: true,
      csrfToken,
    });
  } catch (error) {
    console.error("Verification error:", error);
    sendError(res, 500, "Verification failed");
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 401, "Invalid credentials");
    }

    if (!user.isVerified) {
      return sendError(res, 403, "Account not verified. Check email for OTP");
    }

    const { accessToken, refreshToken } = createTokens(user._id.toString());
    const csrfToken = crypto.randomBytes(32).toString("hex");

    // Store new CSRF token
    user.csrfToken = csrfToken;
    await user.save();
    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, {
      message: "Login successful",
      accessToken,
      csrfToken, // ✅ Add this field
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, 500, "Login failed");
  }
};

// Refresh access token
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const csrfToken = req.headers["x-csrf-token"]; // Get CSRF token from header

    if (!refreshToken) {
      return sendError(res, 401, "Authentication required");
    }

    const userId = validateRefreshToken(refreshToken);
    if (!userId) {
      return sendError(res, 401, "Invalid/expired token");
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Verify CSRF token
    if (!csrfToken || csrfToken !== user.csrfToken) {
      return sendError(res, 403, "Invalid CSRF token");
    }

    if (await RefreshTokenBlacklist.exists({ token: refreshToken })) {
      clearAuthCookies(res);
      return sendError(res, 403, "Session expired. Please login");
    }

    await RefreshTokenBlacklist.create({
      token: refreshToken,
      expiresAt: new Date(Date.now() + ms("7d")),
    });

    const { accessToken, refreshToken: newRefreshToken } = createTokens(userId);
    const newCsrfToken = crypto.randomBytes(32).toString("hex");

    // Rotate CSRF token
    user.csrfToken = newCsrfToken;
    await user.save();

    setRefreshTokenCookie(res, newRefreshToken);

    sendSuccess(res, {
      message: "Token refreshed",
      accessToken,
      auth: buildAuthState(user, newCsrfToken),
    });
  } catch (error) {
    console.error("Refresh error:", error);
    sendError(res, 401, "Session expired. Please login");
  }
};

// User logout

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const csrfToken = req.headers["x-csrf-token"];

    // CSRF protection
    if (req.user && csrfToken && csrfToken !== req.user.csrfToken) {
      return sendError(res, 403, "Invalid CSRF token");
    }

    if (refreshToken) {
      // Check if token is already blacklisted
      const exists = await RefreshTokenBlacklist.exists({
        token: refreshToken,
      });
      if (!exists) {
        await RefreshTokenBlacklist.create({
          token: refreshToken,
          expiresAt: new Date(Date.now() + ms("7d")),
          userId: req.user?._id,
        });
      }
    }

    clearAuthCookies(res);
    sendSuccess(res, { message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    sendError(res, 500, "Logout failed");
  }
};

// Get current user data
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return sendError(res, 401, "Not authenticated");
    }

    const user = await User.findById(req.user._id)
      .select("email role isVerified _id")
      .lean();

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const authState = buildAuthState(user);
    sendSuccess(res, authState);
  } catch (error) {
    console.error("Current user error:", error);
    sendError(res, 500, "Failed to fetch user");
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendError(res, 400, "Invalid email format");
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Security: Don't reveal if user doesn't exist
      return sendSuccess(res, {
        message: "If an account exists, OTP has been resent",
      });
    }

    if (user.isVerified) {
      return sendError(res, 400, "Account already verified");
    }

    // Rate limiting
    const lastOtp = await OTP.findOne({ email });
    if (
      lastOtp &&
      new Date() <
        new Date(new Date(lastOtp.get("createdAt")).getTime() + ms("1m"))
    ) {
      return sendError(res, 429, "Please wait before requesting new OTP");
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 12); // Stronger hashing

    await OTP.findOneAndUpdate(
      { email },
      {
        code: hashedOtp,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + ms("15m")),
        attempts: 0,
      },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "New Verification Code",
      `Your new code: <strong>${otp}</strong> (expires in 15 minutes)`
    );

    sendSuccess(res, {
      message: "OTP resent",
      email: user.email, // Return normalized email
      nextResendAllowed: Date.now() + ms("1m"),
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    sendError(res, 500, "Failed to resend OTP");
  }
};
