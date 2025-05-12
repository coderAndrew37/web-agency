import express, { Request, Response } from "express";
import Newsletter from "../models/subscriber";
import { sendWelcomeEmail } from "../utils/emailService"; // 👈 import here

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      res.status(400).json({ error: "Email is already subscribed" });
      return;
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // ✅ Fire-and-forget, don't block response
    sendWelcomeEmail(email).catch((err: unknown) =>
      console.error("Failed to send welcome email:", err)
    );

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router;
