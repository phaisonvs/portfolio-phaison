import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import useEmblaCarousel from "embla-carousel-react";
// Importar o tipo do pacote core
import { type EmblaOptionsType } from "embla-carousel";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  // Remover estado slidesToShow
  // const [slidesToShow, setSlidesToShow] = useState(3);

  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: "start", // 'start' é ideal para mostrar slides parciais
    slidesToScroll: 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Remover useEffect que atualizava slidesToShow
  // useEffect(() => {
  //   const handleResize = () => { ... };
  //   ...
  // }, []);

  // Manter useEffect para listeners do Embla
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      if (emblaApi) {
        try {
          emblaApi.off("select", onSelect);
          emblaApi.off("reInit", onSelect);
        } catch (error) {
          // console.error("Failed to clean up Embla listeners:", error);
        }
      }
    };
  }, [emblaApi, onSelect]);

  // Se não há projetos, mostra mensagem
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  const MotionDiv = motion.div;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <MotionDiv
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
        </MotionDiv>
        <MotionDiv
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
        </MotionDiv>
      </div>

      {/* Carrossel Embla Unificado */}
      <div className="relative">
        {/* Container do carrossel com overflow-hidden e referência */}
        {/* Adicionar 'relative' para posicionar o pseudo-elemento */}
        {/* Adicionar classes do pseudo-elemento 'after:' para o fade */}
        <div
          className="overflow-hidden -ml-4 relative after:absolute after:inset-y-0 after:right-0 after:w-16 sm:after:w-24 after:bg-gradient-to-l after:from-[rgb(3,7,18)] after:to-transparent after:pointer-events-none"
          ref={emblaRef}
        >
          {/* Container flexível para os slides */}
          <div className="flex pl-4">
            {/* Alterar classes de basis para mostrar slides parciais */}
            {projects.map((project) => (
              <div
                key={project.id}
                // Mobile: 1.5 slides (100 / 1.5 = 66.66%)
                // Tablet: 2 slides (basis-1/2)
                // Desktop: 3.5 slides (100 / 3.5 = ~28.57%)
                className="min-w-0 flex-shrink-0 flex-grow-0 basis-[calc(100%/1.5)] sm:basis-1/2 lg:basis-[calc(100%/3.5)] pl-4"
              >
                <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
                  <div className="relative aspect-video sm:aspect-[16/9] overflow-hidden">
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
              </div>
            ))}
          </div>
        </div>

        {/* Navegação Unificada (Dots e Botões) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="flex justify-center sm:justify-start gap-2 order-2 sm:order-1 sm:flex-1">
            {Array.from({ length: projects.length }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
                  selectedIndex === index
                    ? "bg-emerald-400 scale-110 sm:scale-125"
                    : "bg-gray-600 hover:bg-gray-500 opacity-70"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3 order-1 sm:order-2">
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30"
              onClick={scrollPrev}
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30"
              onClick={scrollNext}
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
