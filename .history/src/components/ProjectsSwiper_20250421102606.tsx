import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Project } from "@/data/projects";

// Importações de estilo do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProjectsSwiperProps {
  projects: Project[];
}

export function ProjectsSwiper({ projects }: ProjectsSwiperProps) {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesPerView(1);
      } else if (width < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
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
    <div className="w-full">
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

      {/* Swiper Carousel */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={slidesPerView}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="projects-swiper"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="h-full rounded-xl flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800/30 hover:border-emerald-800/40 transition-all duration-300 overflow-hidden group">
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles de navegação personalizados */}
        <div className="flex items-center justify-between mt-6">
          <div className="swiper-pagination flex items-center justify-center gap-2 flex-grow"></div>

          <div className="flex items-center gap-2">
            <button
              className="swiper-button-prev h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              aria-label="Slide anterior"
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
              className="swiper-button-next h-9 w-9 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              aria-label="Próximo slide"
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
    </div>
  );
}
