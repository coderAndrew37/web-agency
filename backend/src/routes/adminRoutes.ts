import express, { Request, Response } from "express";
import { protect, admin } from "../middleware/authMiddleware";
import User from "../models/User";
import Testimonial from "../models/testimonial";
import Newsletter from "../models/subscriber";
import { Contact, validateContact } from "../models/contact";
import { sendEmail } from "../utils/emailService";

const router = express.Router();

// ✅ [GET] Fetch All Users (Admin Only)
router.get(
  "/users",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
);

// ✅ [PUT] Change User Role (Promote/Demote)
router.put(
  "/users/:id/role",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      user.role = user.role === "admin" ? "user" : "admin";
      await user.save();

      res.json({ message: `User role updated to ${user.role}` });
    } catch {
      res.status(500).json({ error: "Failed to update user role" });
    }
  }
);

// ✅ [DELETE] Remove User
router.delete(
  "/users/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
);

// ✅ [GET] Fetch All Testimonials (Admin)
router.get(
  "/testimonials",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      res.json(testimonials);
    } catch {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  }
);

// ✅ [PUT] Approve Testimonial
router.put(
  "/testimonials/:id/approve",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        res.status(404).json({ error: "Testimonial not found" });
        return;
      }

      testimonial.approved = true;
      await testimonial.save();

      res.json({ message: "Testimonial approved successfully" });
    } catch {
      res.status(500).json({ error: "Failed to approve testimonial" });
    }
  }
);

// ✅ [DELETE] Remove Testimonial
router.delete(
  "/testimonials/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        res.status(404).json({ error: "Testimonial not found" });
        return;
      }

      await testimonial.deleteOne();
      res.json({ message: "Testimonial deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  }
);

// ✅ [GET] Fetch Newsletter Subscribers
router.get(
  "/newsletter",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const subscribers = await Newsletter.find();
      res.json(subscribers);
    } catch {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  }
);

// ✅ [DELETE] Remove Subscriber
router.delete(
  "/newsletter/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const subscriber = await Newsletter.findById(req.params.id);
      if (!subscriber) {
        res.status(404).json({ error: "Subscriber not found" });
        return;
      }

      await subscriber.deleteOne();
      res.json({ message: "Subscriber removed successfully" });
    } catch {
      res.status(500).json({ error: "Failed to remove subscriber" });
    }
  }
);

// ✅ [POST] Send Bulk Email to Subscribers (Admin)
router.post(
  "/newsletter/send-bulk",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { subject, message } = req.body;

      if (!subject || !message) {
        res.status(400).json({ error: "Subject and message are required" });
        return;
      }

      const subscribers = await Newsletter.find();
      if (subscribers.length === 0) {
        res.status(400).json({ error: "No subscribers found." });
        return;
      }

      // Send emails to all subscribers
      for (const subscriber of subscribers) {
        await sendEmail(subscriber.email, subject, message);
      }

      res.json({
        message: `✅ Email sent to ${subscribers.length} subscribers!`,
      });
    } catch (error) {
      console.error("❌ Bulk Email Sending Failed:", error);
      res.status(500).json({ error: "Failed to send bulk emails" });
    }
  }
);

// ✅ GET: Fetch Contact Messages (Admin Only)
router.get(
  "/",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      console.error("❌ Failed to fetch messages:", err);
      res.status(500).json({ error: "Failed to fetch messages." });
    }
  }
);

export default router;
