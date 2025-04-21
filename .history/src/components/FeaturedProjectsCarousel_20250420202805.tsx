import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

// Definições das variantes de animação para os cards (sem 'position')
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// Transição suave
const transition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | string>(
    "auto"
  );

  // Atualiza o número de cards visíveis baseado na largura da tela
  useEffect(() => {
    function handleResize() {
      let cards = 3;
      if (window.innerWidth < 500) {
        cards = 1;
      } else if (window.innerWidth < 800) {
        cards = 2;
      }
      if (cards !== visibleCards) {
        setPage([0, 0]);
      }
      setVisibleCards(cards);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCards]);

  // Calcula o índice do primeiro card da página atual
  const projectIndex = page * visibleCards;
  // Calcula o número total de páginas
  const totalPages = Math.ceil(projects.length / visibleCards);

  // Função para paginar (avançar/retroceder)
  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;
    // Loop back/forward
    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, totalPages]);

  // Suporte a gestos de toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const difference = touchStart - touchEnd;
    if (Math.abs(difference) > 75) {
      paginate(difference > 0 ? 1 : -1);
    }
  };

  // Seleciona os projetos para a página atual
  const currentProjects = projects.slice(
    projectIndex,
    projectIndex + visibleCards
  );

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
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
            className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Container principal do Carrossel */}
      <div className="w-full max-w-full px-0 overflow-x-hidden">
        <div className="relative w-full">
          {/* Wrapper para os cards com altura mínima definida */}
          <div
            ref={carouselRef}
            className="relative flex w-full overflow-hidden min-h-[450px]" // Mantido min-h-[450px]
            style={{ height: containerHeight }} // Mantido height (pode ser 'auto' se min-h for suficiente)
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* AnimatePresence para animar entrada/saída */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={page * visibleCards + index} // Key correta
                  // Adicionado 'absolute' aqui
                  className="absolute top-0 left-0 w-full h-full shrink-0 grow-0 basis-auto px-2"
                  style={{
                    width: `${100 / visibleCards}%`,
                    left: `${index * (100 / visibleCards)}%`, // Posiciona horizontalmente
                  }}
                  custom={direction}
                  variants={variants} // Variants sem 'position'
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  {/* Conteúdo do Card (mantido) */}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Botões de navegação e indicadores */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Indicadores de página */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    page === index
                      ? "bg-emerald-500 w-4" // Indicador ativo
                      : "bg-gray-600" // Indicador inativo
                  }`}
                  onClick={() => setPage([index, index > page ? 1 : -1])} // Define a página e a direção
                  aria-label={`Ir para página ${index + 1}`}
                  aria-current={page === index ? "true" : "false"}
                />
              ))}
            </div>

            {/* Botões Próximo/Anterior */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(-1)} // Retrocede
                className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                aria-label="Slide anterior"
              >
                {/* Ícone SVG (mantido) */}
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
                onClick={() => paginate(1)} // Avança
                className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                aria-label="Próximo slide"
              >
                {/* Ícone SVG (mantido) */}
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
