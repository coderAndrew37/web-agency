import express, { Request, Response } from "express";
import Blog from "../models/Blog";
import logger from "../utils/logger";

const router = express.Router();

// ✅ [GET] Fetch All Blogs (Public & Admin)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ status: "Published" })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    logger.error("❌ Failed to fetch blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs." });
  }
});

// ✅ [GET] Fetch Single Blog by ID (Public)
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.json(blog);
  } catch (err) {
    logger.error("❌ Failed to fetch blog:", err);
    res.status(500).json({ error: "Failed to fetch blog." });
  }
});

export default router;
