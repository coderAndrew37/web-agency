import express, { Request, Response } from "express";
import Newsletter from "../models/subscriber";
const router = express.Router();

// ✅ Subscribe to Newsletter
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      res.status(400).json({ error: "Email is already subscribed" });
      return;
    }

    // Save new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router;
