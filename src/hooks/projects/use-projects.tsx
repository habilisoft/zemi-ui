import { ProjectsService } from "@/services/projects.service";
import { useQuery } from "@tanstack/react-query";

export function useProjects(searchTerm: string) {
  const projectsService = new ProjectsService();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["projects", searchTerm],
    queryFn: () => projectsService.getProjects(searchTerm),
  });

  return {
    isLoading,
    projects: data,
    reloadProjects: refetch,
  };
}
