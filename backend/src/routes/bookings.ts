import express, { Request, Response } from "express";
import Booking, { validateBooking } from "../models/booking";
import { sendEmail } from "../utils/emailService";
import { addToGoogleCalendar } from "../utils/calendarService";
import logger from "../utils/logger";
import { isSlotAvailable } from "../utils/availabilityCheck";

const router = express.Router();

// ✅ [POST] Book a Call
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { error } = validateBooking(req.body);
  if (error) {
    logger.warn(`⚠️ Validation Error: ${error.details[0].message}`);
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { date, time, clientName, clientEmail } = req.body;

  try {
    // Check if the slot is available
    const slotAvailable = await isSlotAvailable(date, time);
    if (!slotAvailable) {
      res.status(400).json({ error: "This time slot is already booked." });
      return;
    }

    const booking = new Booking(req.body);
    await booking.save();
    logger.info(`📅 New call booked by: ${booking.clientName}`);

    // Add to Google Calendar
    await addToGoogleCalendar(
      `Call with ${clientName}`,
      new Date(date),
      time,
      clientEmail
    );

    // Send Confirmation Email
    const emailContent = `
      <h2>Call Booking Confirmation</h2>
      <p>Thank you, ${booking.clientName}, for scheduling a call with us.</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toDateString()}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
      <p><strong>Platform:</strong> ${booking.platform}</p>
      <p>We look forward to speaking with you! 🚀</p>
    `;

    await sendEmail(
      booking.clientEmail,
      "Call Booking Confirmation",
      emailContent
    );

    res.status(201).json({ message: "Call booked successfully", booking });
  } catch (err: unknown) {
    logger.error(`❌ Error booking call: ${(err as Error).message}`);
    res.status(500).json({ error: "Failed to book call" });
  }
});

// ✅ [GET] Fetch All Bookings (Admin View)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    logger.error(`❌ Error fetching bookings: ${(err as Error).message}`);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// ✅ [PUT] Reschedule a Booking
router.put(
  "/:id/reschedule",
  async (req: Request, res: Response): Promise<void> => {
    const { date, time } = req.body;

    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        res.status(404).json({ error: "Booking not found." });
        return;
      }

      const slotAvailable = await isSlotAvailable(date, time);
      if (!slotAvailable) {
        res.status(400).json({ error: "This time slot is already booked." });
        return;
      }

      booking.date = date;
      booking.time = time;
      await booking.save();

      res.json({ message: "Booking rescheduled successfully", booking });
    } catch (err) {
      logger.error(`❌ Error rescheduling booking: ${(err as Error).message}`);
      res.status(500).json({ error: "Failed to reschedule booking" });
    }
  }
);

// ✅ [PUT] Cancel a Booking
router.put(
  "/:id/cancel",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        res.status(404).json({ error: "Booking not found." });
        return;
      }

      booking.status = "Cancelled";
      await booking.save();

      res.json({ message: "Booking cancelled successfully", booking });
    } catch (err) {
      logger.error(`❌ Error cancelling booking: ${(err as Error).message}`);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  }
);

export default router;
