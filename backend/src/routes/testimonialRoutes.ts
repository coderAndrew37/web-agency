import express, { Request, Response } from "express";
import multer from "multer";
import Testimonial, { validateTestimonial } from "../models/testimonial";
import { protect, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ [POST] Submit a Testimonial (Authenticated Users Only)
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { error } = validateTestimonial(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const { name, message } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;

      const testimonial = new Testimonial({
        user: req.user!.id,
        name,
        message,
        image,
        approved: false, // Admin must approve
      });

      await testimonial.save();
      res.status(201).json({ message: "Testimonial submitted for review" });
    } catch {
      res.status(500).json({ error: "Failed to submit testimonial" });
    }
  }
);

// ✅ [GET] Fetch Approved Testimonials (Public)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({
      createdAt: -1,
    });
    res.json(testimonials);
  } catch {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

export default router;
