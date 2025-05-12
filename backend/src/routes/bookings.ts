import express from "express";
import helmet from "helmet";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController";
import { bookingRequestLimiter } from "../middleware/rateLimiter";
import { protect, admin, csrfProtect } from "../middleware/authMiddleware";

const router = express.Router();

router.use(helmet());
router.post("/", bookingRequestLimiter, asyncHandler(createBooking));

router.use(protect); // All routes below require auth
router.get("/", admin, csrfProtect, asyncHandler(getBookings));
router.get("/:id", admin, csrfProtect, asyncHandler(getBooking));
router.put("/:id/status", admin, csrfProtect, asyncHandler(updateBookingStatus));
router.delete("/:id", admin, csrfProtect, asyncHandler(deleteBooking));

export default router;
