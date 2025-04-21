import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Assuming this path is correct
import { Project } from "@/data/projects";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";

// Restaurar a interface
interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [visibleItemCount, setVisibleItemCount] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<
    UseEmblaCarouselType[1] | null
  >(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItemCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItemCount(2);
      } else {
        setVisibleItemCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para lidar com a mudança do slide selecionado
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      console.log("onSelect: ", index);
      setSelectedIndex(index);
    };

    carouselApi.on("select", onSelect);
    onSelect(); // Definir índice inicial

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Função para navegar para um slide específico (para os dots)
  const scrollTo = useCallback(
    (index: number) => {
      if (!carouselApi) return;
      console.log("scrollTo chamado:", index);
      carouselApi.scrollTo(index);
    },
    [carouselApi]
  );

  // Funções para navegação
  const scrollPrev = useCallback(() => {
    if (!carouselApi) return;
    console.log("scrollPrev chamado");
    carouselApi.scrollPrev();
  }, [carouselApi]);

  const scrollNext = useCallback(() => {
    if (!carouselApi) return;
    console.log("scrollNext chamado");
    carouselApi.scrollNext();
  }, [carouselApi]);

  // ... existing check for empty projects ...
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ... Header ... */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-gray-400 max-w-2xl">
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
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
          containScroll: "trimSnaps",
          slidesToScroll: 1,
        }}
        setApi={setCarouselApi}
        className="w-full"
      >
        <CarouselContent className="flex gap-4">
          {projects.map((project, idx) => (
            <CarouselItem
              key={project.id}
              className="min-w-0 w-full sm:w-1/2 lg:w-1/3"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                }}
                className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300"
              >
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
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700/30">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Dots */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: projects.length }).map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-emerald-400 scale-110"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center justify-center gap-2">
            <CarouselPrevious
              className="static translate-y-0 h-9 w-9 mr-2 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={scrollPrev}
            />
            <CarouselNext
              className="static translate-y-0 h-9 w-9 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={scrollNext}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
