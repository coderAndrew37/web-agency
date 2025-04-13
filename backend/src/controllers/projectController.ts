import { Request, Response } from "express";
import { Project } from "../models/project";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// @desc Get projects of logged-in user
// @route GET /projects/my
export const getUserProjects = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.find({ user: req.user!._id }).sort(
      "-createdAt"
    );
    res.json({ success: true, data: projects });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user projects" });
  }
};

// @desc Get all projects (admin only)
// @route GET /projects
export const getAllProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filter: Record<string, any> = {};

    const { status } = req.query;
    if (
      status &&
      ["pending", "in-progress", "completed"].includes(status as string)
    ) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate("user", "name email")
      .sort("-createdAt");

    res.json({ success: true, data: projects });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all projects" });
  }
};

// @desc Get a single project (admin only)
// @route GET /projects/:id
export const getProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    res.json({ success: true, data: project });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch project" });
  }
};

// @desc Create a new project (admin only)
// @route POST /projects
export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description, user, status } = req.body;

    const newProject = await Project.create({
      name,
      user,
      description,
      status,
    });

    res.status(201).json({ success: true, data: newProject });
  } catch {
    res
      .status(400)
      .json({ success: false, message: "Project creation failed" });
  }
};

// @desc Update project status (admin only)
// @route PATCH /projects/:id
export const updateProjectStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    project.status = req.body.status || project.status;
    await project.save();

    res.json({ success: true, data: project });
  } catch {
    res.status(500).json({ success: false, message: "Project update failed" });
  }
};

// @desc Delete a project (admin only)
// @route DELETE /projects/:id
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    res.json({ success: true, message: "Project deleted" });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Project deletion failed" });
  }
};
