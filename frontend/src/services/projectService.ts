import { apiClient } from "../api/httpClient";
import { ApiResponse } from "../types/api";
import {
  Project,
  ProjectStatus,
  CreateProjectDto,
  UpdateProjectStatusDto,
} from "../types/project";

export const ProjectService = {
  // User endpoints
  getMyProjects: () => apiClient.get<ApiResponse<Project[]>>("/projects/my"),

  // Admin endpoints
  getAllProjects: (status?: ProjectStatus) => {
    const params = status ? { status } : undefined;
    return apiClient.get<ApiResponse<Project[]>>("/projects", { params });
  },

  getProject: (id: string) =>
    apiClient.get<ApiResponse<Project>>(`/projects/${id}`),

  createProject: (projectData: CreateProjectDto) =>
    apiClient.post<ApiResponse<Project>, CreateProjectDto>(
      "/projects",
      projectData
    ),

  updateProjectStatus: (id: string, statusData: UpdateProjectStatusDto) =>
    apiClient.patch<ApiResponse<Project>, UpdateProjectStatusDto>(
      `/projects/${id}`,
      statusData
    ),

  deleteProject: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/projects/${id}`),
};
