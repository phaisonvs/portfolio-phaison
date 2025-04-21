import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project } from "@/data/projects";
import useEmblaCarousel from "embla-carousel-react";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    draggable: true,
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

  useEffect(() => {
    const handleResize = () => {
      console.log("Handling resize...");
      let newSlidesToShow = 3;
      if (window.innerWidth < 640) {
        newSlidesToShow = 1;
      } else if (window.innerWidth < 1024) {
        newSlidesToShow = 2;
      }
      console.log(`New slides to show: ${newSlidesToShow}`);
      setSlidesToShow(newSlidesToShow);

      console.log("Reinitializing Embla...");
      emblaApi?.reInit();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    console.log("Registering Embla listeners...");
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      console.log("Cleaning up Embla listeners...");
      if (emblaApi) {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
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

      <div className="relative mt-8 sm:mt-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`min-w-0 flex-shrink-0 ${
                  slidesToShow === 1
                    ? "w-full pl-4 pr-4"
                    : slidesToShow === 2
                    ? "w-1/2 pl-3 pr-3"
                    : "w-1/3 pl-4 pr-4"
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

        <div className="flex items-center justify-end mt-6 gap-3">
          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    selectedIndex === index
                      ? "bg-emerald-400 scale-125"
                      : "bg-gray-600 hover:bg-gray-500 opacity-70"
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
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
    </div>
  );
}
