import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Project } from "@/data/projects";
import { CustomSwiper } from "./ui/custom-swiper";

// Importações de estilo do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProjectsSwiper.css";

interface ProjectsSwiperProps {
  projects: Project[];
}

export function ProjectsSwiper({ projects }: ProjectsSwiperProps) {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [spaceBetween, setSpaceBetween] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        // Mobile pequeno - 1 card
        setSlidesPerView(1);
        setSpaceBetween(10);
      } else if (width < 600) {
        // Mobile/Tablet - 2 cards
        setSlidesPerView(2);
        setSpaceBetween(12);
      } else {
        // Desktop - 3 cards
        setSlidesPerView(3);
        setSpaceBetween(16);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!projects?.length) {
    return (
      <div className="text-center py-10 text-gray-300">
        Nenhum projeto em destaque disponível
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-medium mb-1.5 xs:mb-2 tracking-tight text-white">
            Projetos em Destaque
          </h2>
          <p className="text-sm xs:text-base text-gray-400 max-w-2xl">
            Explore alguns dos meus trabalhos mais recentes e relevantes
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center text-sm xs:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todos os projetos
          <ArrowRight className="ml-1.5 xs:ml-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
        </Link>
      </div>

      {/* Swiper com configurações responsivas */}
      <div className="projects-swiper-container">
        <CustomSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          className="projects-swiper"
          breakpoints={{
            // Mobile pequeno
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // Mobile/Tablet
            450: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            // Desktop
            600: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="project-card h-full rounded-xl flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300 overflow-hidden group">
                {/* Imagem */}
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

                {/* Conteúdo */}
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
                  <h3 className="text-base xs:text-lg sm:text-xl font-medium mb-1 xs:mb-1.5 sm:mb-2 text-white truncate">
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
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </>
  );
}
