import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { sendEmail } from "../utils/emailService";

const router = express.Router();

// ✅ Request Password Reset
router.post(
  "/forgot-password",
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const resetToken = jwt.sign(
        { userId: user._id },
        process.env.RESET_SECRET!,
        { expiresIn: "1h" }
      );

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      await sendEmail(
        user.email,
        "Password Reset Request",
        `<p>Click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link is valid for 1 hour.</p>`
      );

      res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ Reset Password
router.post(
  "/reset-password/:token",
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.RESET_SECRET!) as {
        userId: string;
      };
      const user = await User.findById(decoded.userId);

      if (!user) {
        res.status(400).json({ error: "Invalid or expired reset token" });
        return;
      }

      user.password = await bcrypt.hash(password, 12);
      await user.save();

      res.json({ message: "Password reset successful! You can now login." });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(400).json({ error: "Invalid or expired reset token" });
    }
  }
);

export default router;
