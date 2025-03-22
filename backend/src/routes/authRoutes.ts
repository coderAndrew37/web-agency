import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { protect, AuthenticatedRequest } from "../middleware/authMiddleware";
import User, { validateUser } from "../models/User"; // ✅ Import validation
import { setTokens } from "../utils/tokenService";
import logger from "../utils/logger"; // ✅ Use Logger

const router = express.Router();

// ✅ [POST] Register a New User
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { error } = validateUser(req.body); // ✅ Validate input
  if (error) {
    logger.warn(
      `⚠️ Registration Validation Error: ${error.details[0].message}`
    );
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    user = new User({ name, email, password });
    await user.save();

    logger.info(`✅ New user registered: ${email}`);
    res.status(201).json({ message: "Registration successful! Please login." });
  } catch (error) {
    logger.error(`❌ Registration Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ [POST] Login User & Get Tokens
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
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
    logger.error(`❌ Login Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ [POST] Logout (Clear Cookies)
router.post("/logout", async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

// ✅ [POST] Refresh Token
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
      const { accessToken } = setTokens(res, decoded.userId); // 🚀 Issue new access token

      res.json({ accessToken });
    } catch (error) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.status(403).json({ error: "Invalid or expired refresh token" });
    }
  }
);

// ✅ [GET] Get Authenticated User
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
