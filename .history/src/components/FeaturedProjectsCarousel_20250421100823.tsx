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
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configuração da animação do spring
  const [{ x }, api] = ReactSpring.useSpring(() => ({
    x: 0,
    config: { mass: 1, tension: 180, friction: 24 },
  }));

  // Navegação do carousel com loop - avançando 1 card por vez
  const nextSlide = () => {
    // Avança para o próximo card, um por vez
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);

    // Calcula a porcentagem de deslocamento com base no índice atual
    const cardWidth = 100 / projects.length;
    api.start({ x: -nextIndex * cardWidth });
  };

  // Navegação do carousel com loop - retrocedendo 1 card por vez
  const prevSlide = () => {
    // Retrocede para o card anterior, um por vez
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);

    // Calcula a porcentagem de deslocamento com base no índice atual
    const cardWidth = 100 / projects.length;
    api.start({ x: -prevIndex * cardWidth });
  };

  if (!projects || projects.length === 0) {
    return <div className="text-center py-8">Nenhum projeto disponível.</div>;
  }

  return (
    <div className="mx-auto w-full max-w-[1150px]">
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
            width: `${100 * projects.length}%`,
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
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
                        >
                          Demo
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {project.gitUrl && (
                        <a
                          href={project.gitUrl}
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
