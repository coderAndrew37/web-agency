import express from "express";
import {
  handleCalendlyWebhook,
  convertBookingToProject,
} from "../controllers/calendlyController";
import { Booking } from "../models/booking";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Webhook endpoint (no auth needed)
router.post("/webhook", handleCalendlyWebhook);

// // Protected admin routes
// router.post("/:id/convert", protect, admin, convertBookingToProject);

// router.get("/", protect, admin, async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email")
//       .sort({ meetingDate: -1 });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// });

export default router;
