import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import useEmblaCarousel from "embla-carousel-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  // Breakpoints personalizados
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTablet = useMediaQuery("(max-width: 800px)");

  // Configuração do Embla com opções otimizadas para mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false, // Desativa drag livre para melhor UX em mobile
    containScroll: "trimSnaps",
    skipSnaps: false,
    inViewThreshold: 0.7, // Ajuda a reduzir layout shifts
  });

  // Estado para controle de slides
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState(3);

  // Atualiza número de slides com base no breakpoint
  useEffect(() => {
    if (isMobile) setSlidesInView(1);
    else if (isTablet) setSlidesInView(2);
    else setSlidesInView(3);

    // Reflow do carousel quando mudar o número de slides
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [isMobile, isTablet, emblaApi]);

  // Handlers de navegação
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Atualiza índice atual
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  if (!projects?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-2 sm:px-0"
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
          className="px-2 sm:px-0"
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

      {/* Container do Carousel */}
      <div className="w-full relative">
        <div
          className="overflow-hidden"
          ref={emblaRef}
          style={{
            // Previne CLS definindo altura mínima
            minHeight: isMobile ? "360px" : isTablet ? "400px" : "420px",
          }}
        >
          <div className="flex">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`
                    flex-shrink-0 px-2 sm:px-4
                    ${isMobile ? "w-full" : isTablet ? "w-1/2" : "w-1/3"}
                  `}
                  style={{
                    // Força largura mínima em mobile para prevenir quebras
                    minWidth: isMobile ? "280px" : "auto",
                  }}
                >
                  <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={400}
                        height={250}
                        style={{
                          // Previne CLS durante carregamento da imagem
                          backgroundColor: "#1f2937",
                        }}
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
                        {project.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > (isMobile ? 2 : 3) && (
                          <span className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                            +{project.tags.length - (isMobile ? 2 : 3)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base xs:text-lg sm:text-xl font-medium mb-1 xs:mb-1.5 sm:mb-2 text-white line-clamp-1">
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
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center justify-center sm:justify-end gap-2 mt-4 sm:mt-6 px-2 sm:px-4 lg:px-0">
          <button
            onClick={scrollPrev}
            className="static translate-y-0 h-8 w-8 sm:h-9 sm:w-9 mr-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center"
            aria-label="Anterior"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
          </button>
          <button
            onClick={scrollNext}
            className="static translate-y-0 h-8 w-8 sm:h-9 sm:w-9 border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center"
            aria-label="Próximo"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Indicadores (apenas em mobile) */}
        {isMobile && (
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: projects.length }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentIndex === idx ? "bg-emerald-400" : "bg-gray-600"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
