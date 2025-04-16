import { useState } from "react";
import { useFilteredProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { LoadingState } from "@/components/ui/loading-state";
import { Project } from "@/services/api";

interface ProjectListProps {
  filter?: string;
}

export function ProjectList({ filter }: ProjectListProps) {
  const [selectedTechnology, setSelectedTechnology] = useState<
    string | undefined
  >(filter);

  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
  } = useFilteredProjects(selectedTechnology);

  const technologies = Array.from(
    new Set(
      (projects || []).flatMap((project: Project) => project.technologies)
    )
  ).sort();

  const handleFilterChange = (tech?: string) => {
    setSelectedTechnology(tech);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Filtrar por tecnologia</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange(undefined)}
            className={`px-4 py-2 rounded-md ${
              !selectedTechnology
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Todos
          </button>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              className={`px-4 py-2 rounded-md ${
                selectedTechnology === tech
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <LoadingState
        isLoading={isLoading}
        isError={isError}
        error={error as Error}
        onRetry={() => refetch()}
      >
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
          </div>
        )}
      </LoadingState>
    </div>
  );
}
