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
  const [containerWidth, setContainerWidth] = useState(0);

  // Calcular largura total e offset baseado no índice atual
  // O offset precisa considerar que cada card ocupa 100% da largura visível
  const getOffset = () => -(currentIndex * 100);

  // Configuração da animação do spring
  const [{ x }, api] = ReactSpring.useSpring(() => ({
    x: 0,
    config: { ...ReactSpring.config.gentle, tension: 220, friction: 30 },
  }));

  // Atualiza o spring quando o índice ou a largura/visibilidade muda
  useEffect(() => {
    api.start({ x: getOffset() });
  }, [currentIndex, visibleCards, containerWidth]);

  // Atualiza o número de cards visíveis e a largura do container
  useEffect(() => {
    function handleResize() {
      const currentContainerWidth = carouselRef.current?.offsetWidth || 0;
      setContainerWidth(currentContainerWidth);

      if (currentContainerWidth < 500) {
        setVisibleCards(1);
      } else if (currentContainerWidth < 800) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }

      // Recalcula o índice atual para garantir que esteja dentro dos limites
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex, Math.max(0, projects.length - visibleCards))
      );
    }

    // Listener para redimensionamento
    window.addEventListener("resize", handleResize);
    // Chamar inicialmente para definir os valores
    handleResize();

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length]); // A dependência visibleCards foi removida daqui para evitar loop

  // Configurar gestos de arrastar
  const bind = useDrag(
    ({
      movement: [mx],
      velocity: [vx],
      direction: [dx],
      last,
      memo = x.get(),
    }) => {
      if (last) {
        const draggedPercent = (mx / containerWidth) * 100;
        const velocityFactor = Math.abs(vx) * 15; // Ajustar sensibilidade da velocidade
        const thresholdPercent = 20; // 20% da largura do container como threshold

        // Determinar o slide alvo baseado no arrasto e velocidade
        const targetIndex = Math.round(
          (memo - draggedPercent - velocityFactor * dx) / 100
        );
        const finalIndex = Math.max(
          0,
          Math.min(projects.length - visibleCards, targetIndex)
        );
        setCurrentIndex(finalIndex);
      } else {
        // Durante o arrasto, move o carousel
        const newX =
          memo + (mx / containerWidth) * 100 * (visibleCards === 1 ? 1 : 1.2); // Aumenta a sensibilidade para > 1 card
        // Aplicar limites elásticos (opcional, mas pode melhorar UX)
        const minOffset = -((projects.length - visibleCards) * 100);
        const maxOffset = 0;
        let boundedX = newX;
        if (newX > maxOffset) boundedX = maxOffset + (newX - maxOffset) * 0.3; // Efeito elástico à direita
        if (newX < minOffset) boundedX = minOffset + (newX - minOffset) * 0.3; // Efeito elástico à esquerda

        api.start({ x: boundedX, immediate: true });
      }
      return memo;
    },
    {
      axis: "x",
      from: () => [x.get(), 0],
      // bounds já estão sendo tratados manualmente com efeito elástico
    }
  );

  // Navegação do carousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, projects.length - visibleCards)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
  }, [visibleCards, projects.length]); // Re-adiciona visibleCards aqui se necessário para lógica interna

  // Configura indicadores de página
  const totalPages = Math.max(1, projects.length - visibleCards + 1);
  const currentPage = currentIndex + 1;

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  // Efeito de cartão ativo (simplificado, foca no card atual)
  const getCardActiveStyles = (cardIndex: number) => {
    const isActive = cardIndex === currentIndex;
    return {
      // Pode adicionar outros estilos aqui se desejar
      // transform: isActive ? "scale(1.02)" : "scale(1)",
      // zIndex: isActive ? 1 : 0,
    };
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 md:px-0">
        <ReactSpring.animated.div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </ReactSpring.animated.div>
        <ReactSpring.animated.div>
          <Link
            to="/projects"
            className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
          </Link>
        </ReactSpring.animated.div>
      </div>

      {/* Implementação de carrossel com react-spring */}
      {/* O overflow-hidden é crucial aqui */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        {...bind()}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projetos em destaque"
      >
        {/* Container dos slides usando react-spring */}
        <ReactSpring.animated.div
          className="flex flex-nowrap"
          style={{
            x: x.to((val) => `${val}%`), // Movimento baseado em percentual
            touchAction: "pan-y", // Permite scroll vertical
          }}
        >
          {projects.map((project, index) => (
            <ReactSpring.animated.div
              key={`${project.id}-${index}`}
              className="transition-transform duration-300 ease-out px-2" // Padding entre os cards
              style={{
                flex: `0 0 ${100 / visibleCards}%`, // Largura baseada nos cards visíveis
                minWidth: `${100 / visibleCards}%`, // Garante a largura mínima
                ...getCardActiveStyles(index),
              }}
            >
              {/* Conteúdo do Card */}
              <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
                {/* ... (imagem, tags, título, descrição, link) ... */}
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
            </ReactSpring.animated.div>
          ))}
        </ReactSpring.animated.div>
      </div>

      {/* Botões de navegação e indicadores (fora do container com overflow) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 md:px-0">
        {/* ... botões e indicadores ... */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === index + 1 ? "bg-emerald-500 w-4" : "bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(index)}
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
            disabled={currentIndex === 0} // Desabilita se for o primeiro
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
            disabled={currentIndex >= projects.length - visibleCards} // Desabilita se for o último
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
