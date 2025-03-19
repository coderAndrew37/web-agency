import express, { Request, Response } from "express";
import PricingRequest, { validatePricing } from "../models/pricingRequest";
import {
  protect,
  admin,
  AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { sendEmail } from "../utils/emailService";
import logger from "../utils/logger";

const router = express.Router();

// ✅ [POST] Submit Pricing Request (Anyone, user attached if logged in)
router.post(
  "/",
  protect.optionalAuth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { error } = validatePricing(req.body);
    if (error) {
      logger.warn(`⚠️ Validation Error: ${error.details[0].message}`);
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const pricingRequest = new PricingRequest({
        ...req.body,
        user: req.user ? req.user.id : null, // Attach user ID if logged in
      });

      await pricingRequest.save();
      logger.info(`✅ New Pricing Request from: ${req.body.email}`);

      // ✅ Send Confirmation Email
      const emailContent = `
      <h2>Pricing Request Received</h2>
      <p>Thank you, ${req.body.fullName}, for your interest in our services.</p>
      <p><strong>Selected Features:</strong></p>
      <ul>
        ${req.body.features
          .map((feature: string) => `<li>${feature}</li>`)
          .join("")}
      </ul>
      <p><strong>Estimated Price:</strong> Ksh ${req.body.totalPrice.toLocaleString()}</p>
      <p>We will reach out soon to discuss further. 🚀</p>
    `;

      await sendEmail(
        req.body.email,
        "Pricing Request Confirmation",
        emailContent
      );

      res.status(201).json({
        message: "Pricing request submitted & email sent!",
        pricingRequest,
      });
    } catch (err) {
      logger.error(
        `❌ Error submitting pricing request: ${(err as Error).message}`
      );
      res.status(500).json({ error: "Failed to submit pricing request." });
    }
  }
);

// ✅ [GET] Fetch All Pricing Requests (Admin Only)
router.get(
  "/",
  protect,
  admin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const pricingRequests = await PricingRequest.find().sort({
        createdAt: -1,
      });
      res.json(pricingRequests);
    } catch (err) {
      logger.error(
        `❌ Error fetching pricing requests: ${(err as Error).message}`
      );
      res.status(500).json({ error: "Failed to fetch pricing requests." });
    }
  }
);

// ✅ [PUT] Update Pricing Request Status (Admin Only)
router.put(
  "/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const pricingRequest = await PricingRequest.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      if (!pricingRequest) {
        res.status(404).json({ error: "Pricing request not found." });
        return;
      }

      res.json({ message: "Pricing request updated!", pricingRequest });
    } catch (err) {
      logger.error(
        `❌ Error updating pricing request: ${(err as Error).message}`
      );
      res.status(500).json({ error: "Failed to update pricing request." });
    }
  }
);

// ✅ [DELETE] Remove a Pricing Request (Admin Only)
router.delete(
  "/:id",
  protect,
  admin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const pricingRequest = await PricingRequest.findByIdAndDelete(
        req.params.id
      );
      if (!pricingRequest) {
        res.status(404).json({ error: "Pricing request not found." });
        return;
      }

      res.json({ message: "Pricing request deleted!" });
    } catch (err) {
      logger.error(
        `❌ Error deleting pricing request: ${(err as Error).message}`
      );
      res.status(500).json({ error: "Failed to delete pricing request." });
    }
  }
);

export default router;
