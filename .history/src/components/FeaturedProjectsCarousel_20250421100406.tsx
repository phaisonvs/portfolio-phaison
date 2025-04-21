import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import * as ReactSpring from "@react-spring/web";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Configuração da animação do spring
  const [{ x }, api] = ReactSpring.useSpring(() => ({
    x: 0,
    config: { mass: 1, tension: 180, friction: 24 },
  }));

  // Atualiza o número de cards visíveis baseado na largura do carrossel
  useEffect(() => {
    function handleResize() {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const width = carousel.offsetWidth;

      if (width < 500) {
        setVisibleCards(1); // Mobile - um card
      } else if (width < 800) {
        setVisibleCards(2); // Tablet - dois cards
      } else {
        setVisibleCards(3); // Desktop - três cards
      }

      // Ajuste do índice atual para garantir que está dentro dos limites
      if (currentIndex > projects.length - visibleCards) {
        setCurrentIndex(Math.max(0, projects.length - visibleCards));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length, currentIndex, visibleCards]);

  // Atualiza a posição X do carrossel quando o índice muda
  useEffect(() => {
    const cardWidth = 100 / visibleCards;
    api.start({ x: -currentIndex * cardWidth });
  }, [currentIndex, visibleCards, api]);

  // Navegação do carousel com loop - avançando 1 card por vez
  const nextSlide = () => {
    if (currentIndex >= projects.length - visibleCards) {
      // Se estiver no último slide, volta para o início
      setCurrentIndex(0);
    } else {
      // Avança um card por vez
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Navegação do carousel com loop - retrocedendo 1 card por vez
  const prevSlide = () => {
    if (currentIndex <= 0) {
      // Se estiver no primeiro slide, vai para o último
      setCurrentIndex(Math.max(0, projects.length - visibleCards));
    } else {
      // Retrocede um card por vez
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!projects?.length) {
    return (
      <div className="text-center py-10">
        Nenhum projeto em destaque disponível
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            aria-label="Slide anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            aria-label="Próximo slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todos os projetos
          <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
        </Link>
      </div>

      {/* Carousel container */}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
        <ReactSpring.animated.div
          className="flex w-full"
          style={{
            width: `${projects.length * 100}%`,
            x: x.to((x) => `${x}%`),
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="px-2"
              style={{ width: `${100 / projects.length}%` }}
            >
              <div className="group h-full rounded-xl flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300 overflow-hidden">
                {/* Project image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project details */}
                <div className="p-4 pb-5 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium text-white mb-1.5">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/50">
                    <div className="flex items-center gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
                        >
                          Demo
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
                        >
                          GitHub
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReactSpring.animated.div>
      </div>
    </div>
  );
}
