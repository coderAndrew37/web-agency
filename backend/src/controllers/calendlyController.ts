import { Request, Response } from "express";
import { Booking, bookingValidationSchema } from "../models/booking";
import User from "../models/User";
import { createProjectFromBooking } from "../services/projectService";
import { CalendlyEvent, CalendlyQuestionAnswer } from "../types/calendly";
import logger from "../utils/logger";

export const handleCalendlyWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const event = req.body as CalendlyEvent;
  logger.info(`📅 Received Calendly event: ${event.event}`);

  try {
    // Validate webhook payload structure
    const { error } = bookingValidationSchema.validate(event.payload);
    if (error) {
      logger.warn(`Invalid webhook payload: ${error.message}`);
      res.status(400).send("Invalid payload");
      return;
    }

    // Find or create user based on Calendly invitee
    let user = await User.findOne({ email: event.payload.email });
    if (!user) {
      user = await User.create({
        name: event.payload.name,
        email: event.payload.email,
        role: "user",
      });
    }

    switch (event.event) {
      case "invitee.created":
        await Booking.create({
          calendlyEventUri: event.payload.event_uri,
          serviceType:
            event.payload.questions_and_answers?.find(
              (q: CalendlyQuestionAnswer) => q.question === "Service Type"
            )?.answer || "web-design",
          user: user._id,
          meetingDate: new Date(event.payload.start_time),
          status: "scheduled",
          notes: event.payload.questions_and_answers?.find(
            (q: CalendlyQuestionAnswer) => q.question === "Additional Notes"
          )?.answer,
        });
        break;

      case "invitee.cancelled":
        await Booking.findOneAndUpdate(
          { calendlyEventUri: event.payload.event_uri },
          { status: "cancelled" }
        );
        break;

      case "invitee.no_show":
        await Booking.findOneAndUpdate(
          { calendlyEventUri: event.payload.event_uri },
          { status: "cancelled", notes: "Marked as no-show" }
        );
        break;
    }

    res.status(200).send("Webhook processed");
  } catch (err) {
    logger.error(`❌ Calendly webhook error: ${err}`);
    res.status(500).send("Webhook processing failed");
  }
};

export const convertBookingToProject = async (req: Request, res: Response) => {
  try {
    const project = await createProjectFromBooking(req.params.id);
    res.status(201).json(project);
  } catch (err) {
    logger.error(`Project conversion failed: ${err}`);
    res.status(500).json({ error: "Project conversion failed" });
  }
};
