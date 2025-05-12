// controllers/bookingController.ts
import { Request, Response } from "express";
import { Booking, IBooking, bookingValidationSchema } from "../models/booking";
import { sendEmail, notifyAdminNewBooking } from "../utils/emailService";
import logger from "../utils/logger";

export const createBooking = async (req: Request, res: Response) => {
  try {
    // Validate request body (mirrors frontend Zod validation)
    const { error } = bookingValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.reduce<Record<string, string>>(
        (acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {}
      );
      return res.status(400).json({ errors });
    }

    // Create new booking with frontend data structure
    const booking = new Booking({
      name: req.body.name,
      email: req.body.email,
      selectedPlan: req.body.selectedPlan || "Custom Strategy Call", // Default if not provided
      description: req.body.description,
      status: "pending",
    });

    await booking.save();

    // Send emails (non-blocking)
    try {
      await sendConfirmationEmail(booking);
      await notifyAdminNewBooking(booking);
    } catch (err) {
      logger.error(`Email sending failed: ${err}`);
    }

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      booking: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        selectedPlan: booking.selectedPlan,
        status: booking.status,
      },
    });
  } catch (err) {
    logger.error(`Booking creation failed: ${err}`);
    res.status(500).json({
      error: "Failed to create booking",
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.message
            : String(err)
          : "Internal server error",
    });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .select("-__v")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    logger.error(`Failed to fetch bookings: ${err}`);
    res.status(500).json({
      error: "Failed to fetch bookings",
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.message
            : String(err)
          : "Internal server error",
    });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).select("-__v");

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (err) {
    logger.error(`Failed to fetch booking: ${err}`);
    res.status(500).json({
      error: "Failed to fetch booking",
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.message
            : String(err)
          : "Internal server error",
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status value",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      booking,
    });
  } catch (err) {
    logger.error(`Failed to update booking status: ${err}`);
    res.status(500).json({
      error: "Failed to update booking status",
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.message
            : String(err)
          : "Internal server error",
    });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    logger.error(`Failed to delete booking: ${err}`);
    res.status(500).json({
      error: "Failed to delete booking",
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.message
            : String(err)
          : "Internal server error",
    });
  }
};

// Helper function for sending confirmation email
const sendConfirmationEmail = async (booking: IBooking) => {
  const subject = "Your Strategy Call Booking Confirmation";
  const html = `
    <h2>Thank you for booking a strategy call, ${booking.name}!</h2>
    <p>We've received your request for the <strong>${
      booking.selectedPlan
    }</strong>.</p>
    ${
      booking.description
        ? `
    <h3>Your Project Details:</h3>
    <p>${booking.description}</p>
    `
        : ""
    }
    <p>Our team will review your submission and contact you shortly to schedule the call.</p>
    <p>If you have any questions, please reply to this email.</p>
  `;

  await sendEmail(booking.email, subject, html);
};
