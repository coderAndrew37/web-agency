import express from "express";
import {
  registerUser,
  verifyUserOtp,
  loginUser,
} from "../controllers/authController";

const router = express.Router();

// Register endpoint
router.post("/register", registerUser);

// OTP Verification endpoint
router.post("/verify-otp", verifyUserOtp);

// Login endpoint
router.post("/login", loginUser);

export default router;
