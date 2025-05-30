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

  // Setup do carrossel Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Reintroduzidos estados e lógica para Mobile
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0); // Para direção da animação

  const handleMobilePrev = useCallback(() => {
    console.log("handleMobilePrev called"); // Log
    setDirection(-1);
    setMobileIndex((prev) => {
      const newIndex = (prev - 1 + projects.length) % projects.length;
      console.log(`handleMobilePrev: newIndex = ${newIndex}`); // Log
      return newIndex;
    });
  }, [projects.length]);

  const handleMobileNext = useCallback(() => {
    console.log("handleMobileNext called"); // Log
    setDirection(1);
    setMobileIndex((prev) => {
      const newIndex = (prev + 1) % projects.length;
      console.log(`handleMobileNext: newIndex = ${newIndex}`); // Log
      return newIndex;
    });
  }, [projects.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Apenas captura a posição final, a lógica está no handleTouchEnd
    if (e.targetTouches.length > 0) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStart === 0 || touchEnd === 0) return; // Evita disparo sem movimento

    const threshold = 50; // Distância mínima para swipe
    if (touchStart - touchEnd > threshold) {
      handleMobileNext();
    }
    if (touchStart - touchEnd < -threshold) {
      handleMobilePrev();
    }
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Efeito para atualizar slidesToShow (não reinicia mais embla)
  useEffect(() => {
    const handleResize = () => {
      let newSlidesToShow = 3;
      if (window.innerWidth < 640) {
        newSlidesToShow = 1;
      } else if (window.innerWidth < 1024) {
        newSlidesToShow = 2;
      }
      setSlidesToShow(newSlidesToShow);
      // Removido emblaApi?.reInit(); pois Embla só roda em desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Removido emblaApi das dependências

  // Efeito para registrar listeners do Embla (apenas desktop)
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect); // reInit pode ser necessário se o DOM mudar
    onSelect(); // Chama uma vez para definir o estado inicial

    return () => {
      // Limpa listeners ao desmontar ou se emblaApi mudar
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reintroduzidos slideVariants para animação mobile
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.4, ease: "easeOut" }, // Ajuste na animação
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.4, ease: "easeIn" }, // Ajuste na animação
        opacity: { duration: 0.2 },
      },
    }),
  };

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
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </div>
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center text-sm sm:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Desktop Carousel com Embla (restaurado hidden sm:block) */}
      <div className="hidden sm:block relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`min-w-0 pl-4 ${
                  slidesToShow === 1
                    ? "w-full"
                    : slidesToShow === 2
                    ? "w-1/2"
                    : "w-1/3"
                }`}
              >
                <div className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300">
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

        {/* Navegação para Desktop */}
        <div className="flex items-center justify-end mt-6 gap-3">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex gap-2">
              {Array.from({ length: Math.min(projects.length, 5) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      selectedIndex === index
                        ? "bg-emerald-400 scale-125"
                        : "bg-gray-600 hover:bg-gray-500 opacity-70"
                    }`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                )
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30"
              onClick={scrollPrev}
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="bg-gray-800/70 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700/30"
              onClick={scrollNext}
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Projects Slider (Estrutura Simplificada + Logs) */}
      <div className="block sm:hidden mt-8">
        {/* Container principal mobile */}
        <div className="relative w-full max-w-[320px] min-w-[280px] mx-auto">
          {/* Container do slide visível (removido motion.div externa e style) */}
          <div className="overflow-hidden rounded-xl">
            <motion.div
              key={mobileIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(event, { offset, velocity }) => {
                console.log("onDragEnd called", { offset, velocity }); // Log
                const swipeThreshold = 50;
                const swipePower = Math.abs(offset.x) * velocity.x;

                if (swipePower < -swipeThreshold) {
                  console.log("Swipe detected: calling handleMobileNext"); // Log
                  handleMobileNext();
                } else if (swipePower > swipeThreshold) {
                  console.log("Swipe detected: calling handleMobilePrev"); // Log
                  handleMobilePrev();
                }
              }}
              // Removido 'absolute' e outras classes de posicionamento daqui
              className="group w-full overflow-hidden rounded-xl flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 transition-colors duration-300 hover:border-emerald-800/40"
            >
              {/* Conteúdo do Card Mobile (sem alterações internas) */}
              {projects.length > 0 && mobileIndex < projects.length ? (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={projects[mobileIndex].image}
                      alt={projects[mobileIndex].title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* ... (overlay da imagem) ... */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <div className="flex gap-2">
                        {projects[mobileIndex].liveUrl && (
                          <a
                            href={projects[mobileIndex].liveUrl}
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
                  <div className="p-4 flex-grow flex flex-col">
                    {/* ... (tags, título, descrição, link) ... */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {projects[mobileIndex].tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                      {projects[mobileIndex].tags.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                          +{projects[mobileIndex].tags.length - 3}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">
                      {projects[mobileIndex].title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 mb-4">
                      {projects[mobileIndex].description}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/projects/${projects[mobileIndex].id}`}
                        className="inline-flex items-center text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                      >
                        Ver detalhes
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Projeto inválido
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Dots e Botões para Mobile (Adicionado Log nos Dots) */}
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-1.5">
            {projects.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ease-out-expo ${
                  index === mobileIndex
                    ? "bg-emerald-400 scale-125 w-3"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => {
                  console.log(
                    `Dot clicked: index = ${index}, current mobileIndex = ${mobileIndex}`
                  ); // Log
                  setDirection(index > mobileIndex ? 1 : -1);
                  setMobileIndex(index);
                  console.log(`Dot click: new mobileIndex will be ${index}`); // Log
                }}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleMobilePrev} // Chama handler com log
              className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleMobileNext} // Chama handler com log
              className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
