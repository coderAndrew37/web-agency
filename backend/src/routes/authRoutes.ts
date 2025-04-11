import express from "express";
import {
  register,
  verify,
  login,
  refresh,
  logout,
} from "../controllers/authController";
import { otpRequestLimiter } from "../middleware/rateLimiter";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/verify", otpRequestLimiter, verify);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);

export default router;
