// routes/projectRoutes.ts
import express from "express";
import { protect, admin } from "../middleware/authMiddleware";
import {
  getUserProjects,
  getAllProjects,
  createProject,
  updateProjectStatus,
  deleteProject,
  getProject,
} from "../controllers/projectController";
import { validateBody } from "../middleware/validateBody";
import { projectValidationSchema } from "../models/project";

const router = express.Router();

// ✅ USER: Get their own projects
router.get("/my", protect, getUserProjects);

// ✅ ADMIN: Get all projects
router.get("/", protect, admin, getAllProjects);

// ✅ ADMIN: Get a single project
router.get("/:id", protect, admin, getProject);

// ✅ ADMIN: Create a project (validate body)
router.post(
  "/",
  protect,
  admin,
  validateBody(projectValidationSchema),
  createProject
);

// ✅ ADMIN: Update status only
router.patch("/:id", protect, admin, updateProjectStatus);

// ✅ ADMIN: Delete a project
router.delete("/:id", protect, admin, deleteProject);

export default router;
