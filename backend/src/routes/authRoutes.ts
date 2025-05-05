import express from "express";
import helmet from "helmet";
import {
  register,
  verify,
  login,
  refresh,
  logout,
  getCurrentUser,
} from "../controllers/authController";
import { otpRequestLimiter } from "../middleware/rateLimiter";
import { protect, csrfProtect } from "../middleware/authMiddleware"; // Import csrfProtect

const app = express();
app.use(helmet());

const router = express.Router();

router.post("/register", register);
router.post("/verify", otpRequestLimiter, verify);
router.post("/login", login);
router.post("/refresh", protect, csrfProtect, refresh); // Add CSRF protection
router.post("/logout", protect, csrfProtect, logout); // Add CSRF protection
router.get("/me", protect, csrfProtect, getCurrentUser); // Add CSRF protection

export default router;
