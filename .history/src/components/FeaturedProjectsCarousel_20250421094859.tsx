import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import * as ReactSpring from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
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
    config: { mass: 1, tension: 180, friction: 24 },
  }));

  // Atualiza o número de cards visíveis baseado na largura do carrossel
  useEffect(() => {
    function handleResize() {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const width = carousel.offsetWidth;

      if (width < 500) {
        setVisibleCards(1);
      } else if (width < 800) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }

      // Ajuste do índice atual para garantir que está dentro dos limites
      if (currentIndex > projects.length - visibleCards) {
        setCurrentIndex(Math.max(0, projects.length - visibleCards));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length, currentIndex]);

  // Atualiza a posição X do carrossel quando o índice muda
  useEffect(() => {
    const cardWidth = 100 / visibleCards;
    api.start({ x: -currentIndex * cardWidth });
  }, [currentIndex, visibleCards, api]);

  // Navegação do carousel
  const nextSlide = () => {
    const maxIndex = Math.max(0, projects.length - visibleCards);
    setCurrentIndex((curr) => Math.min(curr + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((curr) => Math.max(curr - 1, 0));
  };

  // Configurar gestos para arrastar
  const bind = useDrag(
    ({ down, movement: [mx], direction: [dx], distance }) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const cardWidth = carousel.offsetWidth / visibleCards;

      if (down) {
        // Durante o arrasto, mova o carrossel com o dedo
        const x =
          -currentIndex * (100 / visibleCards) +
          (mx / cardWidth) * (100 / visibleCards);
        api.start({ x, immediate: true });
      } else {
        // Quando soltar, determinar para qual cartão navegar
        const moveThreshold = cardWidth * 0.25; // 25% da largura do cartão

        if (Math.abs(mx) > moveThreshold) {
          // Usar mx em vez de distance para evitar erro de tipo
          if (dx < 0 && currentIndex < projects.length - visibleCards) {
            nextSlide();
          } else if (dx > 0 && currentIndex > 0) {
            prevSlide();
          } else {
            // Voltar à posição original se não puder mover mais
            api.start({ x: -currentIndex * (100 / visibleCards) });
          }
        } else {
          // Não moveu o suficiente, voltar à posição original
          api.start({ x: -currentIndex * (100 / visibleCards) });
        }
      }
    }
  );

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
        <Link
          to="/projects"
          className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todos os projetos
          <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
        </Link>
      </div>

      {/* Carousel container - Importante ter width: 100% e overflow: hidden */}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
        <ReactSpring.animated.div
          className="flex w-full"
          style={{
            width: `${projects.length * 100}%`,
            x: x.to((x) => `${x}%`),
          }}
          {...bind()}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="px-2"
              style={{ width: `${100 / projects.length}%` }}
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
        </ReactSpring.animated.div>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        {/* Indicadores */}
        <div className="flex items-center gap-1">
          {Array.from({
            length: Math.max(1, projects.length - visibleCards + 1),
          }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-emerald-500 w-4" : "bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
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
            disabled={currentIndex >= projects.length - visibleCards}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
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
      </div>
    </div>
  );
}
