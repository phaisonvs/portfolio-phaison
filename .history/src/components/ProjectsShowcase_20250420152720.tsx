import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center text-sm sm:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Projects Grid - Oculto em telas muito pequenas */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                        aria-label="Ver site ao vivo"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center text-sm sm:text-base text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                  >
                    Ver detalhes
                    <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Projects Slider (Visible only on small screens) */}
      <div className="block sm:hidden mt-8">
        <div className="relative w-full max-w-[320px] min-w-[280px] mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <div className="flex gap-2">
                  {projects[currentIndex].liveUrl && (
                    <a
                      href={projects[currentIndex].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Ver site ao vivo"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {projects[currentIndex].tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                  >
                    {tag}
                  </span>
                ))}
                {projects[currentIndex].tags.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                    +{projects[currentIndex].tags.length - 3}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">
                {projects[currentIndex].title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 mb-4">
                {projects[currentIndex].description}
              </p>
              <div className="mt-auto">
                <Link
                  to={`/projects/${projects[currentIndex].id}`}
                  className="inline-flex items-center text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                >
                  Ver detalhes
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
            <button
              onClick={prevProject}
              className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gray-700/70 transition-colors"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <button
              onClick={nextProject}
              className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gray-700/70 transition-colors"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-1">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-emerald-400" : "bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
