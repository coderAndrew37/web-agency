import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  protect,
  admin,
  AuthenticatedRequest,
} from "../middleware/authMiddleware";
import User from "../models/User";
import { setTokens } from "../utils/tokenService";

const router = express.Router();

// ✅ Register a New User
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Registration successful! Please login." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login User & Get Tokens
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const { accessToken, refreshToken } = setTokens(res, user._id.toString());

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Logout (Clear Cookies)
router.post("/logout", async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

// ✅ Refresh Token
router.post(
  "/refresh-token",
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: "No refresh token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as {
        userId: string;
      };

      const { accessToken } = setTokens(res, decoded.userId);
      res.json({ accessToken });
    } catch {
      res.status(403).json({ error: "Invalid or expired refresh token" });
    }
  }
);

// ✅ Get Authenticated User
router.get(
  "/me",
  protect,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.json(req.user);
  }
);

export default router;
