import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectById, Project } from "@/services/api";

/**
 * Hook para obter todos os projetos
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

/**
 * Hook para obter um projeto pelo ID
 */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!id, // Só executa se o ID estiver definido
  });
};

/**
 * Hook para filtrar projetos por tecnologia
 */
export const useFilteredProjects = (technology?: string) => {
  const projectsQuery = useProjects();

  const filteredProjects = (projectsQuery.data || []).filter(
    (project: Project) => {
      if (!technology) return true;
      return project.technologies.includes(technology);
    }
  );

  return {
    ...projectsQuery,
    data: filteredProjects,
  };
};
