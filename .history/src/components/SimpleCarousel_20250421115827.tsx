import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "./SimpleCarousel.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// Definição da interface para os items do carrossel
export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  tags?: string[];
}

// Props do componente de carrossel
interface SimpleCarouselProps {
  items: CarouselItem[];
  title?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ items, title }) => {
  // Opções do Swiper
  const swiperParams = {
    modules: [Pagination, Navigation, Autoplay, EffectCoverflow],
    spaceBetween: 30,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto" as const,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1.5,
      slideShadows: false,
    },
    pagination: {
      clickable: true,
    },
    loop: items.length > 2,
    loopAdditionalSlides: 1,
  };

  return (
    <div className="modern-carousel-container">
      {title && <h2 className="modern-carousel-title">{title}</h2>}

      {items.length > 0 ? (
        <Swiper {...swiperParams} className="modern-carousel">
          {items.map((item) => (
            <SwiperSlide key={item.id} className="modern-carousel-slide">
              <div className="modern-project-card">
                <div className="modern-card-image-container">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="modern-card-image"
                  />
                  {item.projectUrl && (
                    <div className="modern-card-overlay">
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-project-btn"
                      >
                        Ver Projeto
                      </a>
                    </div>
                  )}
                </div>
                <div className="modern-card-content">
                  <h3 className="modern-card-title">{item.title}</h3>
                  <p className="modern-card-description">{item.description}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="modern-card-tags">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="modern-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="modern-carousel-empty">
          Nenhum projeto disponível no momento.
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;
