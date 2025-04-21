import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ModernCarousel.css";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
}

interface ModernCarouselProps {
  items: Project[];
  title?: string;
  subtitle?: string;
}

export const ModernCarousel: React.FC<ModernCarouselProps> = ({
  items,
  title = "Projetos em Destaque",
  subtitle = "Confira alguns dos meus trabalhos mais recentes",
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="modern-carousel-empty">Nenhum projeto disponível.</div>
    );
  }

  return (
    <div className="modern-carousel-section">
      <div className="modern-carousel-header">
        <h2 className="modern-carousel-title">{title}</h2>
        <p className="modern-carousel-subtitle">{subtitle}</p>
      </div>

      <div className="modern-swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={"auto"}
          centeredSlides={false}
          loop={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".modern-swiper-pagination",
          }}
          navigation={{
            nextEl: ".modern-swiper-button-next",
            prevEl: ".modern-swiper-button-prev",
          }}
          className="modern-swiper"
          watchOverflow={true}
          breakpoints={{
            768: {
              spaceBetween: 32,
            },
            1024: {
              spaceBetween: 40,
            },
          }}
          onSwiper={setSwiperInstance}
        >
          {items.map((project) => (
            <SwiperSlide key={project.id} className="modern-swiper-slide">
              <div className="modern-project-card">
                <div className="modern-card-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="modern-card-image"
                  />
                  <div className="modern-card-tags">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="modern-card-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="modern-card-tag more">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="modern-card-content">
                  <h3 className="modern-card-title">{project.title}</h3>
                  <p className="modern-card-description">
                    {project.description.length > 90
                      ? `${project.description.substring(0, 90)}...`
                      : project.description}
                  </p>
                  <div className="modern-card-actions">
                    <a
                      href={`/project/${project.id}`}
                      className="modern-card-link"
                    >
                      Ver detalhes <ArrowRight size={16} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modern-card-icon-link"
                        aria-label="Ver demo ao vivo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="modern-swiper-navigation">
          <div className="modern-swiper-pagination"></div>
          <div className="modern-swiper-buttons">
            <button
              className="modern-swiper-button-prev"
              aria-label="Slide anterior"
              onClick={() => swiperInstance?.slidePrev()}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="modern-swiper-button-next"
              aria-label="Próximo slide"
              onClick={() => swiperInstance?.slideNext()}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
