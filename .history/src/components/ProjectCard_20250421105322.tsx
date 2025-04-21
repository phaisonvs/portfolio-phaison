import React from "react";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Project } from "@/types/Project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="group relative flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Imagem do Projeto */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={`Screenshot do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-4">
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-bold text-gray-100 mb-2"
        >
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tecnologias */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-emerald-900/50 text-emerald-400 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
              aria-label={`Ver código fonte do projeto ${project.title} no GitHub`}
            >
              <FiGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
              aria-label={`Ver demonstração do projeto ${project.title}`}
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
