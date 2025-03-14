import express, { Request, Response } from "express";
import Client, { validateClient } from "../models/client";
import { sendEmail, notifyAdminNewClient } from "../utils/emailService";
import logger from "../utils/logger";

const router = express.Router();

// ✅ [POST] Submit Client Onboarding Form
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { error } = validateClient(req.body);
  if (error) {
    logger.warn(`⚠️ Validation Error: ${error.details[0].message}`);
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const client = new Client(req.body);
    await client.save();
    logger.info(`✅ New client onboarded: ${client.fullName}`);

    // ✅ Send Welcome Email to Client
    const emailContent = `
      <h2>Welcome to Our Agency, ${client.fullName}!</h2>
      <p>Thank you for signing up. Our team will reach out shortly.</p>
      <p><strong>Project Details:</strong></p>
      <ul>
        <li><strong>Email:</strong> ${client.email}</li>
        <li><strong>Phone:</strong> ${client.phone}</li>
        <li><strong>Business Name:</strong> ${client.businessName}</li>
        <li><strong>Services Interested:</strong> ${client.servicesInterested}</li>
        <li><strong>Budget:</strong> ${client.budget}</li>
        <li><strong>Message:</strong> ${client.message}</li>
      </ul>
      <p>We look forward to working with you! 🚀</p>
    `;

    await sendEmail(client.email, "Welcome to Our Agency!", emailContent);

    // ✅ Notify Admin
    await notifyAdminNewClient(client.fullName, client.email);

    res.status(201).json({ message: "Client onboarded & email sent", client });
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    logger.error(`❌ Error onboarding client: ${errorMessage}`);
    res.status(500).json({ error: "Failed to onboard client" });
  }
});

export default router;
