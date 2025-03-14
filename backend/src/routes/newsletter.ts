import express, { Request, Response } from "express";
import Subscriber, { validateSubscriber } from "../models/subscriber";
import { sendEmail } from "../utils/emailService";
import logger from "../utils/logger";

const router = express.Router();

// ✅ [POST] Subscribe to Newsletter
router.post("/", async (req: Request, res: Response) => {
  const { error } = validateSubscriber(req.body);
  if (error) {
    logger.warn(`⚠️ Validation Error: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email } = req.body;

  try {
    // Check if email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email already subscribed." });
    }

    // Save to database
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    logger.info(`✅ New subscriber: ${subscriber.email}`);

    // ✅ Send Welcome Email
    const emailContent = `
      <h2>Welcome to Sleek Sites, ${subscriber.email}!</h2>
      <p>You’re now part of our exclusive updates. Stay tuned for tips & offers.</p>
      <p>Visit our <a href="https://sleeksites.com">website</a> for more!</p>
    `;

    await sendEmail(subscriber.email, "Welcome to Sleek Sites!", emailContent);

    return res.status(201).json({ message: "Subscription successful!" });
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    logger.error(`❌ Error subscribing: ${errorMessage}`);
    return res.status(500).json({ error: "Subscription failed." });
  }
});

export default router;
