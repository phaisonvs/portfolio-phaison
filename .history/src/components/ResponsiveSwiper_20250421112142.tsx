import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "./ResponsiveSwiper.css";
import type { Swiper as SwiperType } from "swiper";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interface para os projetos
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
}

interface ResponsiveSwiperProps {
  items: Project[];
}

export const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({
  items,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperInstance) {
      // Quando o Swiper é inicializado, conectamos nossos botões personalizados
      if (prevRef.current) {
        prevRef.current.addEventListener("click", () => {
          swiperInstance.slidePrev();
        });
      }
      if (nextRef.current) {
        nextRef.current.addEventListener("click", () => {
          swiperInstance.slideNext();
        });
      }
    }
  }, [swiperInstance]);

  if (!items || items.length === 0) {
    return (
      <div className="responsive-swiper-vazio">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="responsive-swiper-wrapper">
      <div className="responsive-swiper-header">
        <h2 className="responsive-swiper-title">Projetos em Destaque</h2>
        <p className="responsive-swiper-subtitle">
          Confira alguns dos meus trabalhos mais recentes
        </p>
      </div>

      <div className="responsive-swiper-container">
        {/* Container de navegação posicionado à direita */}
        <div className="swiper-navigation-container">
          <div ref={prevRef} className="swiper-button-prev">
            <ChevronLeft size={18} />
          </div>
          <div ref={nextRef} className="swiper-button-next">
            <ChevronRight size={18} />
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          onSwiper={setSwiperInstance}
          className="responsive-swiper"
        >
          {items.map((project, index) => (
            <SwiperSlide
              key={project.id}
              className="responsive-swiper-slide"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="project-card-modern">
                <div className="project-card-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image"
                  />
                  <div className="project-card-overlay">
                    {/* Badges/tags no topo da imagem */}
                    <div className="project-card-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag project-tag-more">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Ações - aparecem no hover */}
                    <div
                      className={`project-card-actions ${
                        hoverIndex === index ? "active" : ""
                      }`}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-action-btn primary"
                        >
                          <ExternalLink className="action-icon" />
                          <span>Ver Demo</span>
                        </a>
                      )}
                      <a
                        href={`/project/${project.id}`}
                        className="project-card-action-btn secondary"
                      >
                        <ArrowUpRight className="action-icon" />
                        <span>Detalhes</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card-content">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">
                    {project.description.length > 120
                      ? `${project.description.substring(0, 120)}...`
                      : project.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
