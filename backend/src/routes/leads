import express, { Request, Response } from "express";
import Lead, { validateLead } from "../models/Lead";
import { sendEmail } from "../utils/emailService";
import logger from "../utils/logger"; // ✅ Consistent logging

const router = express.Router();

// ✅ [POST] Capture Lead & Send Resource
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { error } = validateLead(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const { name, email, resourceType } = req.body;

    // ✅ Check if lead already exists
    let lead = await Lead.findOne({ email, resourceType });
    if (lead) {
      res.status(400).json({ error: "You already claimed this resource!" });
      return;
    }

    // ✅ Save Lead in DB
    lead = new Lead(req.body);
    await lead.save();

    // ✅ Send Email with Resource Link
    const resourceLinks: Record<string, string> = {
      "SEO Guide": "https://example.com/seo-guide.pdf",
      "Facebook Ads Mastery": "https://example.com/facebook-ads.pdf",
      "E-commerce Growth Blueprint":
        "https://example.com/ecommerce-blueprint.pdf",
    };

    const emailContent = `
      <h2>Thanks for Downloading ${resourceType} 🎉</h2>
      <p>Hello ${name},</p>
      <p>Click below to download your resource:</p>
      <a href="${resourceLinks[resourceType] || "#"}" target="_blank" 
         style="display:inline-block;padding:10px 20px;color:#fff;background:#007BFF;border-radius:5px;text-decoration:none;">
         Download Now
      </a>
      <p>Enjoy and let us know if you have any questions!</p>
    `;

    await sendEmail(email, `Your ${resourceType} is Ready!`, emailContent);

    lead.status = "Delivered";
    await lead.save();

    res.status(201).json({ message: "Lead captured & resource sent!" });
  } catch (err) {
    logger.error("❌ Error processing lead:", err);
    res.status(500).json({ error: "Failed to process request." });
  }
});

export default router;
