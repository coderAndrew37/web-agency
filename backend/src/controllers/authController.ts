import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ms from "ms";
import User, { validateUser } from "../models/User";
import OTP from "../models/otp";
import RefreshTokenBlacklist from "../models/RefreshTokenBlacklist";
import { sendEmail } from "../utils/emailService";
import { generateOTP } from "../utils/generateOtp";
import {
  createTokens,
  isTokenRefreshRateLimited,
  setTokensAsCookies,
} from "../utils/tokenManager";

// Utility function for consistent error responses
const sendError = (
  res: Response,
  status: number,
  message: string,
  details?: any
) => {
  res.status(status).json({ error: message, ...details });
};

// ✅ Enhanced Register Controller
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return sendError(res, 400, "Validation failed", {
        errors: error.details.map((d) => d.message),
      });
    }

    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 409, "Email is already registered");
    }

    const user = new User({ name, email, password });
    await user.save();

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.findOneAndUpdate(
      { email },
      {
        code: hashedOtp,
        createdAt: new Date(),
        attempts: 0,
        expiresAt: new Date(Date.now() + ms("15m")), // ✅ 15 minutes later
      },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Verify your account",
      `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 15 minutes.</p>`
    );

    res.status(201).json({
      message: "Account created. Check your email for verification OTP.",
      email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    sendError(res, 500, "Internal server error during registration");
  }
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return sendError(res, 400, "Email or OTP code are required");
    }

    const otpDoc = await OTP.findOne({
      email,
      createdAt: { $gt: new Date(Date.now() - 15 * 60 * 1000) },
    });

    if (!otpDoc || !otpDoc.code) {
      return sendError(res, 400, "OTP expired or invalid", {
        codeExpired: true,
        solution: "Request a new OTP",
      });
    }

    if ((otpDoc.attempts ?? 0) >= 5) {
      return sendError(res, 429, "Too many attempts", {
        solution: "Request a new OTP",
      });
    }

    const isCodeValid = await bcrypt.compare(code, otpDoc.code);
    if (!isCodeValid) {
      await OTP.updateOne({ email }, { $inc: { attempts: 1 } });
      return sendError(res, 400, "Invalid OTP code", {
        attemptsRemaining: 5 - ((otpDoc.attempts ?? 0) + 1),
      });
    }

    await OTP.deleteOne({ email });
    const user = await User.findOneAndUpdate(
      { email },
      {
        isVerified: true,
        verifiedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const { accessToken, refreshToken } = createTokens(user._id.toString());
    setTokensAsCookies(res, accessToken, refreshToken);

    await sendEmail(
      email,
      "Welcome to Sleek Sites!",
      `<p>Your account has been successfully verified. <br> We're glad to have you onboard</p>`
    );

    res.status(200).json({
      message: "Account verified successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    sendError(res, 500, "Internal server error during verification");
  }
};
// ✅ Enhanced Login Controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, 401, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 401, "Invalid email or password");
    }

    if (!user.isVerified) {
      return sendError(res, 403, "Account not verified", {
        solution: "Check your email for verification OTP",
      });
    }

    const { accessToken, refreshToken } = createTokens(user._id.toString());
    setTokensAsCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, 500, "Internal server error during login");
  }
};

// ✅ Resend OTP Controller
export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      sendError(res, 404, "User not found");
    }

    if (user?.isVerified) {
      sendError(res, 400, "Account already verified");
    }

    // Generate and store new OTP
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Check if the user has exceeded the maximum attempts
    await OTP.findOneAndUpdate(
      { email },
      {
        code: hashedOtp,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // ✅ 15 minutes later
        attempts: 0,
      },
      { upsert: true, new: true }
    );

    // Send new OTP email
    await sendEmail(
      email,
      "Your new verification code",
      `<p>Your new verification code is: <strong>${otp}</strong></p>
       <p>This code will expire in 15 minutes.</p>`
    );

    res.status(200).json({
      message: "New OTP sent successfully",
      email,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    sendError(res, 500, "Internal server error while resending OTP");
  }
};

// ✅ Refresh Token Controller
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return sendError(res, 401, "No refresh token provided");
    }

    if (isTokenRefreshRateLimited(req)) {
      return sendError(res, 429, "Too many refresh attempts. Please wait.");
    }

    const blacklisted = await RefreshTokenBlacklist.findOne({ token });
    if (blacklisted) {
      return sendError(res, 403, "Refresh token invalidated");
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    await RefreshTokenBlacklist.create({
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const { accessToken, refreshToken } = createTokens(user._id.toString());
    setTokensAsCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error:", error);
    sendError(res, 401, "Invalid or expired refresh token");
  }
};

// ✅ Logout Controller
export const logout = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // Optionally add the refresh token to blacklist here
    if (refreshToken) {
      RefreshTokenBlacklist.create({
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }).catch(console.error);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    sendError(res, 500, "Internal server error during logout");
  }
};
