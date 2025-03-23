import express, { Request, Response } from "express";
import { protect, admin } from "../middleware/authMiddleware";
import User from "../models/User";
import Testimonial from "../models/testimonial";
import Newsletter from "../models/subscriber";
import { Contact, validateContact } from "../models/contact";
import { sendEmail } from "../utils/emailService";
import logger from "../utils/logger";

import Blog, { validateBlog } from "../models/Blog";

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

// ✅ [GET] Fetch Contact Messages (Admin Only)
router.get(
  "/contacts",
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

// ✅ [POST] Reply to a Contact Message (Admin Only)
router.post(
  "/contacts/:id/reply",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { subject, message } = req.body;
      if (!subject || !message) {
        res.status(400).json({ error: "Subject and message are required" });
        return;
      }

      const contactMessage = await Contact.findById(req.params.id);
      if (!contactMessage) {
        res.status(404).json({ error: "Message not found" });
        return;
      }

      // Send email reply
      await sendEmail(
        contactMessage.email,
        subject,
        `<p>Hello ${contactMessage.name},</p><p>${message}</p>`
      );

      res.json({ message: "Reply sent successfully!" });
    } catch (err) {
      console.error("❌ Failed to send reply:", err);
      res.status(500).json({ error: "Failed to send reply." });
    }
  }
);

// ✅ [DELETE] Remove Contact Message (Admin Only)
router.delete(
  "/contacts/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const message = await Contact.findById(req.params.id);
      if (!message) {
        res.status(404).json({ error: "Message not found" });
        return;
      }

      await message.deleteOne();
      res.json({ message: "Contact message deleted successfully" });
    } catch (err) {
      console.error("❌ Failed to delete message:", err);
      res.status(500).json({ error: "Failed to delete message." });
    }
  }
);

// ✅ [GET] Fetch All Blogs (Admin Only)
router.get(
  "/blogs",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const blogs = await Blog.find()
        .populate("author", "name")
        .sort({ createdAt: -1 });
      res.json(blogs);
    } catch (err) {
      logger.error("❌ Failed to fetch blogs:", err);
      res.status(500).json({ error: "Failed to fetch blogs." });
    }
  }
);

// ✅ [PUT] Update a Blog (Admin Only)
router.put(
  "/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    const { error } = validateBlog(req.body);
    if (error) {
      logger.warn(`⚠️ Validation Error: ${error.details[0].message}`);
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      Object.assign(blog, req.body);
      await blog.save();
      logger.info(`✅ Blog updated: ${blog.title}`);

      res.json({ message: "Blog updated successfully", blog });
    } catch (err) {
      logger.error("❌ Error updating blog:", err);
      res.status(500).json({ error: "Failed to update blog." });
    }
  }
);

// ✅ [PUT] Publish / Unpublish Blog (Admin Only)
router.put(
  "/blogs/:id/status",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      blog.status = blog.status === "Draft" ? "Published" : "Draft";
      await blog.save();

      res.json({ message: `Blog status updated to ${blog.status}` });
    } catch (err) {
      logger.error("❌ Error updating blog status:", err);
      res.status(500).json({ error: "Failed to update blog status." });
    }
  }
);

// ✅ [GET] Fetch Admin Dashboard Stats
router.get(
  "/stats",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const userCount = await User.countDocuments();
      const testimonialCount = await Testimonial.countDocuments();
      const subscriberCount = await Newsletter.countDocuments();
      const contactMessageCount = await Contact.countDocuments();

      res.json({
        users: userCount,
        testimonials: testimonialCount,
        subscribers: subscriberCount,
        contactMessages: contactMessageCount,
      });
    } catch (error) {
      console.error("❌ Failed to fetch admin stats:", error);
      res.status(500).json({ error: "Failed to fetch admin stats." });
    }
  }
);

export default router;
