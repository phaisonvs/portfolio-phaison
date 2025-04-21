import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as ReactSpring from "@react-spring/web";
import { Project } from "@/data/projects";

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
    config: { mass: 1, tension: 180, friction: 26 }, // Ajuste na fricção
  }));

  // Atualiza o número de cards visíveis baseado na largura do carrossel
  useEffect(() => {
    function handleResize() {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const width = carousel.offsetWidth;
      let newVisibleCards = 3;

      // Pontos de quebra ajustados para melhor responsividade
      if (width < 640) {
        newVisibleCards = 1;
      } else if (width < 1024) {
        newVisibleCards = 2;
      } else {
        newVisibleCards = 3;
      }

      if (newVisibleCards !== visibleCards) {
        setVisibleCards(newVisibleCards);
        // Ajuste do índice atual para garantir que está dentro dos limites ao mudar visibleCards
        setCurrentIndex((curr) =>
          Math.min(curr, Math.max(0, projects.length - newVisibleCards))
        );
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length, visibleCards]);

  // Atualiza a posição X do carrossel quando o índice ou visibleCards muda
  useEffect(() => {
    const cardWidthPercent = 100 / visibleCards;
    api.start({ x: -currentIndex * cardWidthPercent });
  }, [currentIndex, visibleCards, api]);

  // Navegação do carousel com loop
  const nextSlide = () => {
    const numItems = projects.length;
    if (numItems <= visibleCards) return; // Não faz loop se todos itens estão visíveis
    setCurrentIndex((curr) => (curr + 1) % (numItems - visibleCards + 1));
  };

  const prevSlide = () => {
    const numItems = projects.length;
    if (numItems <= visibleCards) return; // Não faz loop se todos itens estão visíveis
    setCurrentIndex(
      (curr) =>
        (curr - 1 + (numItems - visibleCards + 1)) %
        (numItems - visibleCards + 1)
    );
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length, visibleCards]); // Dependências corretas

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4 sm:px-0">
        <div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
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
        {/* Container Deslizante */}
        <ReactSpring.animated.div
          className="flex"
          style={{
            transform: x.to((val) => `translateX(${val}%)`),
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="pr-4"
              style={{
                width: `${100 / visibleCards}%`,
                flexShrink: 0,
              }}
            >
              {/* Conteúdo do Card */}
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
        </ReactSpring.animated.div>
      </div>

      {/* Navigation dots/indicators */}
      <div className="flex justify-center mt-8 px-4 sm:px-0">
        <div className="flex items-center space-x-3">
          {Array.from({
            length: Math.ceil(projects.length / visibleCards),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * visibleCards)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx * visibleCards === currentIndex
                  ? "bg-emerald-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="hidden sm:flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-2">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "opacity-80 hover:opacity-100"
          } bg-white dark:bg-gray-900 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 -translate-x-2`}
          aria-label="Projeto anterior"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= projects.length - visibleCards}
          className={`${
            currentIndex >= projects.length - visibleCards
              ? "opacity-30 cursor-not-allowed"
              : "opacity-80 hover:opacity-100"
          } bg-white dark:bg-gray-900 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 translate-x-2`}
          aria-label="Próximo projeto"
        >
          <ChevronRight className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
}
