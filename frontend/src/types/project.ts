// types/project.ts
export type ProjectStatus = "pending" | "in-progress" | "completed";

export interface ProjectUser {
  _id: string;
  name: string;
  email: string;
}

export interface Project {
  _id: string;
  name: string;
  description?: string; // Added since backend uses this
  status: ProjectStatus;
  user: string | ProjectUser; // Can be ID or populated user
  createdAt: string;
  updatedAt?: string; // Added for completeness
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  user: string;
  status?: ProjectStatus; // Optional since backend has default
}

export interface UpdateProjectStatusDto {
  status: ProjectStatus;
}
