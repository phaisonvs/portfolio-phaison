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

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  // Configurações baseadas no tamanho da tela
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Setup do carrossel Embla (UNIFICADO)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Garantir loop infinito
    align: "start",
    slidesToScroll: 1,
    draggable: true, // Habilitar swipe em todas as plataformas
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false); // Embora loop=true, manter para consistência da API
  const [canScrollNext, setCanScrollNext] = useState(true); // Embora loop=true, manter para consistência da API

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Atualiza o estado com base na seleção do Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev()); // Atualiza mesmo com loop
    setCanScrollNext(emblaApi.canScrollNext()); // Atualiza mesmo com loop
  }, [emblaApi]);

  // Efeito para atualizar slidesToShow com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize(); // Configuração inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efeito para conectar o embla carousel API e seus eventos
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect); // Atualiza no reInit também
    onSelect(); // Chama uma vez na inicialização

    // Limpa os listeners ao desmontar
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
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

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
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
        </motion.div>
        <motion.div
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
        </motion.div>
      </div>

      {/* Carrossel UNIFICADO com Embla (sem 'hidden sm:block') */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {/* Mapeamento dos projetos (mantido igual) */}
            {projects.map((project) => (
              <div
                key={project.id}
                className={`min-w-0 flex-shrink-0 flex-grow-0 pl-4 ${
                  // Adicionado flex-shrink-0 e flex-grow-0
                  slidesToShow === 1
                    ? "basis-full" // Usar basis para controle de largura
                    : slidesToShow === 2
                    ? "basis-1/2"
                    : "basis-1/3"
                }`}
              >
                <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
                  {/* Conteúdo do Card (mantido igual) */}
                  <div className="relative aspect-video overflow-hidden">
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

        {/* Navegação (visível em todas as telas) */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-6 gap-4 sm:gap-3">
          {/* Dots (limitado a 5 para clareza, ou o número total se menor) */}
          <div className="flex gap-2 order-2 sm:order-1">
            {/* Usar scrollSnapList para obter a lista correta de índices para os dots */}
            {emblaApi?.scrollSnapList().map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  selectedIndex === index
                    ? "bg-emerald-400 scale-125"
                    : "bg-gray-600 hover:bg-gray-500 opacity-70"
                }`}
                onClick={() => emblaApi?.scrollTo(index)} // Funciona com loop
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Botões de Navegação */}
          <div className="flex gap-3 order-1 sm:order-2">
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30 disabled:opacity-50"
              onClick={scrollPrev}
              disabled={!canScrollPrev} // Manter para feedback visual, mesmo com loop
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30 disabled:opacity-50"
              onClick={scrollNext}
              disabled={!canScrollNext} // Manter para feedback visual, mesmo com loop
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
