import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useSpring, animated, config } from "@react-spring/web";
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

  // Calcular largura total e offset baseado no índice atual
  const getOffset = () => -(currentIndex * (100 / visibleCards));

  // Configuração da animação do spring
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { ...config.gentle, tension: 220, friction: 30 },
  }));

  // Atualiza o spring quando o índice muda
  useEffect(() => {
    api.start({ x: getOffset() });
  }, [currentIndex, visibleCards]);

  // Atualiza o número de cards visíveis baseado na largura da tela
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
        setVisibleCards(1);
      } else if (window.innerWidth < 800) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    }

    // Chama a função uma vez para definir o valor inicial
    handleResize();

    // Adiciona e remove o listener de resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configurar gestos de arrastar
  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], direction: [dx], last }) => {
      // Capturar gesto de arrasto apenas quando finalizado e com velocidade suficiente
      if (last) {
        const threshold = window.innerWidth * 0.15; // 15% da largura da tela
        const hasEnoughVelocity = vx > 0.3;
        const draggedFarEnough = Math.abs(mx) > threshold;

        if (hasEnoughVelocity || draggedFarEnough) {
          if ((dx < 0 && hasEnoughVelocity) || mx < -threshold) {
            nextSlide();
          } else if ((dx > 0 && hasEnoughVelocity) || mx > threshold) {
            prevSlide();
          } else {
            // Retorna para a posição atual se não houver movimento suficiente
            api.start({ x: getOffset() });
          }
        } else {
          // Retorna para a posição atual se não houver velocidade suficiente
          api.start({ x: getOffset() });
        }
      } else {
        // Durante o arrasto, move o carousel com o dedo/mouse
        const slideWidth = 100 / visibleCards;
        const currentOffset = getOffset();
        const targetX =
          currentOffset + (mx / window.innerWidth) * slideWidth * 2;

        // Limita o arrasto para não ultrapassar os limites
        const minOffset = -(
          (projects.length - visibleCards) *
          (100 / visibleCards)
        );
        const maxOffset = 0;
        const clampedX = Math.max(minOffset, Math.min(maxOffset, targetX));

        api.start({ x: clampedX, immediate: true });
      }
    },
    {
      axis: "x",
      rubberband: true,
      bounds: { left: -window.innerWidth / 2, right: window.innerWidth / 2 },
      from: () => [x.get(), 0],
    }
  );

  // Navegação do carousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >=
        Math.min(projects.length - visibleCards + 1, projects.length)
        ? 0
        : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0
        ? Math.min(projects.length - visibleCards, projects.length - 1)
        : prevIndex - 1;
    });
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
  }, [visibleCards, projects.length]);

  // Configura indicadores de página
  const totalPages = Math.max(1, Math.ceil(projects.length / visibleCards));
  const currentPage = Math.min(Math.floor(currentIndex / 1) + 1, totalPages);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  // Efeito de cartão ativo
  const getCardActiveStyles = (index: number) => {
    const isActive = index === 0;
    return {
      transform: isActive ? "scale(1.03)" : "scale(1)",
      borderColor: isActive
        ? "rgba(52, 211, 153, 0.3)"
        : "rgba(31, 41, 55, 0.3)",
      boxShadow: isActive
        ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        : "none",
    };
  };

  return (
    <div className="space-y-8 w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <animated.div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </animated.div>
        <animated.div>
          <Link
            to="/projects"
            className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
          </Link>
        </animated.div>
      </div>

      {/* Implementação de carrossel com react-spring */}
      <div
        className="w-full px-2 sm:px-4 lg:px-0 max-w-full"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projetos em destaque"
      >
        <div className="relative w-full max-w-full">
          {/* Wrapper do carrossel */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            {...bind()}
          >
            {/* Container dos slides usando react-spring */}
            <animated.div
              className="flex flex-nowrap"
              style={{
                x: x.to((val) => `${val}%`),
                touchAction: "pan-y",
              }}
            >
              {projects.map((project, index) => (
                <animated.div
                  key={`${project.id}-${index}`}
                  className="w-full px-2 transition-all duration-300"
                  style={{
                    flex: `0 0 calc(${100 / visibleCards}% - 16px)`,
                    maxWidth: `calc(${100 / visibleCards}% - 16px)`,
                    ...getCardActiveStyles(index - currentIndex),
                  }}
                >
                  <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
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
                </animated.div>
              ))}
            </animated.div>
          </div>

          {/* Botões de navegação e indicadores */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === index + 1
                      ? "bg-emerald-500 w-4"
                      : "bg-gray-600"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index * visibleCards);
                  }}
                  aria-label={`Ir para página ${index + 1}`}
                  aria-current={currentPage === index + 1 ? "true" : "false"}
                />
              ))}
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
          </div>
        </div>
      </div>
    </div>
  );
}
