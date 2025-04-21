import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Interface para as props do componente
interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  // Função para determinar quantos itens são visíveis com base na largura da tela
  const updateVisibleItems = () => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(3); // Desktop: 3 itens
    } else if (window.innerWidth >= 640) {
      setVisibleItems(2); // Tablet: 2 itens
    } else {
      setVisibleItems(1); // Mobile: 1 item
    }
  };

  // Atualiza dimensões ao montar e quando a janela é redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        setContainerWidth(containerWidth);
        updateVisibleItems();
        // Ajusta a largura de cada item com base nos itens visíveis + pequeno gap
        const newItemWidth = containerWidth / visibleItems;
        setItemWidth(newItemWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleItems]);

  // Efeito para ajustar traduções quando as dimensões ou itens visíveis mudam
  useEffect(() => {
    handleSnapToItem(currentIndex);
  }, [itemWidth, visibleItems]);

  // Retorna ao começo quando chega ao final ou vice-versa (loop)
  const normalizeIndex = (index: number) => {
    const totalItems = projects.length;
    if (index < 0) return totalItems - visibleItems;
    if (index > totalItems - visibleItems) return 0;
    return index;
  };

  // Move para o próximo conjunto de itens
  const handleNext = () => {
    const newIndex = normalizeIndex(currentIndex + visibleItems);
    handleSnapToItem(newIndex);
    setCurrentIndex(newIndex);
  };

  // Move para o conjunto anterior de itens
  const handlePrev = () => {
    const newIndex = normalizeIndex(currentIndex - visibleItems);
    handleSnapToItem(newIndex);
    setCurrentIndex(newIndex);
  };

  // Calcule a posição para o snap
  const handleSnapToItem = (index: number) => {
    const normalizedIndex = normalizeIndex(index);
    setCurrentIndex(normalizedIndex);
    const newTranslateX = -normalizedIndex * itemWidth;
    setTranslateX(newTranslateX);
  };

  // Manipuladores para interação por toque e arrastar
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - translateX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const newTranslateX = clientX - startX;

    // Limitando o arrasto para não ultrapassar os limites
    const minTranslate = -((projects.length - visibleItems) * itemWidth);
    if (newTranslateX > 0) {
      setTranslateX(0);
    } else if (newTranslateX < minTranslate) {
      setTranslateX(minTranslate);
    } else {
      setTranslateX(newTranslateX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Determina o índice mais próximo após arrastar
    const itemIndex = Math.round(Math.abs(translateX) / itemWidth);
    handleSnapToItem(itemIndex);
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, itemWidth]);

  // Caso não haja projetos para exibir
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum projeto em destaque disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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

      {/* Carousel Container */}
      <div className="w-full relative px-4 lg:px-0">
        <div ref={carouselRef} className="w-full overflow-hidden">
          <div
            className={cn(
              "flex transition-transform duration-300 ease-out",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${projects.length * itemWidth}px`,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="pr-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] xs:aspect-video overflow-hidden">
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
                    <div className="p-3 xs:p-5 flex-grow flex flex-col">
                      <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-2 xs:mb-3">
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
                      <h3 className="text-lg xs:text-xl font-medium mb-1.5 xs:mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-xs xs:text-sm text-gray-300 line-clamp-2 mb-3 xs:mb-4">
                        {project.description}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center text-sm xs:text-base text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                        >
                          Ver detalhes
                          <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center sm:justify-end gap-2 mt-6">
          <button
            onClick={handlePrev}
            className="static h-9 w-9 mr-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="static h-9 w-9 border border-gray-700 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
