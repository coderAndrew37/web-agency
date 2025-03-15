import express, { Request, Response } from "express";
import multer from "multer";
import Testimonial, { validateTestimonial } from "../models/testimonial";
import {
  protect,
  admin,
  AuthenticatedRequest,
} from "../middleware/authMiddleware";

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

// ✅ [GET] Fetch All Testimonials (Admin Only)
router.get(
  "/all",
  protect,
  admin,
  async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      res.json(testimonials);
    } catch {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  }
);

// ✅ [PUT] Approve Testimonial (Admin Only)
router.put(
  "/:id/approve",
  protect,
  admin,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

// ✅ [DELETE] Remove Testimonial (Admin Only)
router.delete(
  "/:id",
  protect,
  admin,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

export default router;
