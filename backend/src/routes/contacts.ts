import express, { Request, Response } from "express";
import { Contact, validateContact } from "../models/contact";
import { sendEmail } from "../utils/emailService";

const router = express.Router();

// ✅ POST: Submit Contact Form
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { error } = validateContact(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const contact = new Contact(req.body);
    await contact.save();

    // ✅ Ensure ADMIN_EMAIL exists to prevent errors
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "📩 New Contact Form Submission",
        `<h2>New Message from ${req.body.name}</h2>
         <p><strong>Email:</strong> ${req.body.email}</p>
         <p><strong>Message:</strong> ${req.body.message}</p>`
      );
    } else {
      console.warn("⚠️ ADMIN_EMAIL is not set in environment variables.");
    }

    res.status(201).json({ message: "Your message has been sent!" });
  } catch (err) {
    console.error("❌ Contact Form Error:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
