import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ArrowLeft } from "lucide-react";
import * as ReactSpring from "@react-spring/web";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

export const FeaturedProjectsCarousel: React.FC<
  FeaturedProjectsCarouselProps
> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Define quantos cards são visíveis por vez baseado na largura da tela
  const getVisibleCards = () => {
    if (windowWidth >= 800) return 3; // Desktop - três cards
    if (windowWidth >= 640) return 2; // Tablet - dois cards
    return 1; // Mobile - um card
  };

  const visibleCards = getVisibleCards();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Função para avançar no carrossel
  const nextSlide = () => {
    // Implementação com loop contínuo, avançando 1 card por vez
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= projects.length ? 0 : prevIndex + 1
    );
  };

  // Função para retroceder no carrossel
  const prevSlide = () => {
    // Implementação com loop contínuo, retrocedendo 1 card por vez
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Animação de transição para os cards
  const cardVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
      };
    },
  };

  if (!projects?.length) {
    return (
      <div className="text-center py-10">
        Nenhum projeto em destaque disponível
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="px-6 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-white">
            Projetos em Destaque
          </h2>
          <p className="text-gray-300 dark:text-gray-300">
            Confira alguns dos trabalhos dos quais me orgulho
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 text-white transition-colors"
            aria-label="Projeto anterior"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 text-white transition-colors"
            aria-label="Próximo projeto"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-500 ease-in-out",
            windowWidth < 640 ? "gap-4" : "gap-6"
          )}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
            width: `${(100 * projects.length) / visibleCards}%`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative shrink-0 grow-0"
              style={{
                width: `${100 / projects.length}%`,
                flexBasis: `${100 / projects.length}%`,
              }}
            >
              <div className="group h-full rounded-xl flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300 overflow-hidden">
                {/* Imagem */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
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

                {/* Conteúdo */}
                <div className="p-3 xs:p-4 sm:p-5 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-2 xs:mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base xs:text-lg sm:text-xl font-medium mb-1 xs:mb-1.5 sm:mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs xs:text-sm text-gray-300 line-clamp-2 mb-2 xs:mb-3 sm:mb-4">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-sm xs:text-base text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                    >
                      Ver detalhes
                      <ArrowRight className="ml-1 xs:ml-1.5 sm:ml-2 h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
