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
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

// Props do componente de carrossel
interface SimpleCarouselProps {
  items: ProjectItem[];
  title?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({
  items,
  title = "Projetos em destaque",
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="modern-carousel-container">
        <h2 className="modern-carousel-title">{title}</h2>
        <div className="modern-carousel-empty">
          Nenhum projeto para mostrar no momento.
        </div>
      </div>
    );
  }

  return (
    <div className="modern-carousel-container">
      <h2 className="modern-carousel-title">{title}</h2>
      <Swiper
        className="modern-carousel"
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto" as const}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        initialSlide={1}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="modern-carousel-slide">
            <div className="modern-project-card">
              <div className="modern-card-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="modern-card-image"
                />
                <div className="modern-card-overlay">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Ver projeto
                  </a>
                </div>
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
    </div>
  );
};

export default SimpleCarousel;
