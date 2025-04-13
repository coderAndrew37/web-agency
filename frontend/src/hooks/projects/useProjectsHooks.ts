import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../../services/projectService";
import { ApiResponse } from "../../types/api";
import {
  Project,
  ProjectStatus,
  CreateProjectDto,
  UpdateProjectStatusDto,
} from "../../types/project";

// Query keys for consistent caching
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: { status?: ProjectStatus } = {}) =>
    [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  my: () => [...projectKeys.all, "my"] as const,
};

// Hook for getting current user's projects
export const useMyProjects = () => {
  return useQuery<ApiResponse<Project[]>, Error>({
    queryKey: projectKeys.my(),
    queryFn: () => ProjectService.getMyProjects(),
  });
};

// Hook for admin to get all projects (with optional status filter)
export const useAllProjects = (status?: ProjectStatus) => {
  return useQuery<ApiResponse<Project[]>, Error>({
    queryKey: projectKeys.list({ status }),
    queryFn: () => ProjectService.getAllProjects(status),
    // Only enable if user is admin (you might want to add this)
    // enabled: isAdmin,
  });
};

// Hook for getting a single project (admin)
export const useProject = (id: string) => {
  return useQuery<ApiResponse<Project>, Error>({
    queryKey: projectKeys.detail(id),
    queryFn: () => ProjectService.getProject(id),
    // Only fetch if ID exists
    enabled: !!id,
  });
};

// Hook for creating a new project (admin)
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Project>, Error, CreateProjectDto>({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      // Invalidate all project lists after creation
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

// Hook for updating project status (admin)
export const useUpdateProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Project>,
    Error,
    { id: string; data: UpdateProjectStatusDto }
  >({
    mutationFn: ({ id, data }) => ProjectService.updateProjectStatus(id, data),
    onSuccess: (data, variables) => {
      // Update the cache for the specific project
      queryClient.setQueryData(projectKeys.detail(variables.id), () => data);
      // Invalidate all lists to reflect the change
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

// Hook for deleting a project (admin)
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, string>({
    mutationFn: ProjectService.deleteProject,
    onSuccess: (_, id) => {
      // Remove the deleted project from cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
      // Invalidate all lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};
