import { Request, Response } from "express";
import User from "../models/User";
import OTP from "../models/otp";
import { generateOTP } from "../utils/generateOtp";
import { sendEmail } from "../utils/emailService";
import { hashPassword } from "../utils/hash";
import logger from "../utils/logger";

const OTP_EXPIRY_MINUTES = 10;

// ✅ Request OTP for password reset
export const requestPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const otp = generateOTP();
    await OTP.findOneAndUpdate(
      { email },
      { code: otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Password Reset Code",
      `<p>Your password reset OTP is: <strong>${otp}</strong></p>`
    );

    res.status(200).json({ message: "Reset OTP sent to your email." });
  } catch (err) {
    logger.error(`Password reset request error: ${(err as Error).message}`);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ✅ Verify OTP and reset password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc || otpDoc.code !== code) {
      res.status(400).json({ error: "Invalid or expired OTP." });
      return;
    }

    const now = new Date();
    const ageInMinutes =
      (now.getTime() - otpDoc.createdAt.getTime()) / (1000 * 60);
    if (ageInMinutes > OTP_EXPIRY_MINUTES) {
      await OTP.deleteOne({ email });
      res
        .status(400)
        .json({ error: "OTP has expired. Please request a new one." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    await OTP.deleteOne({ email });

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    logger.error(`Password reset error: ${(err as Error).message}`);
    res.status(500).json({ error: "Internal server error." });
  }
};
