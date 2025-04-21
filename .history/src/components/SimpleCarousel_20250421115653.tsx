import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "./SimpleCarousel.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Interface para os projetos
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
}

interface SimpleCarouselProps {
  items: Project[];
}

export const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="modern-carousel-empty">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="modern-carousel-container">
      <h2 className="modern-carousel-title">Projetos em Destaque</h2>

      <Swiper
        modules={[Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="modern-carousel"
      >
        {items.map((project) => (
          <SwiperSlide key={project.id} className="modern-carousel-slide">
            <div className="modern-project-card">
              <div className="modern-card-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="modern-card-image"
                />
                <div className="modern-card-overlay">
                  <a
                    href={project.liveUrl || "#"}
                    className="view-project-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Projeto
                  </a>
                </div>
              </div>

              <div className="modern-card-content">
                <h3 className="modern-card-title">{project.title}</h3>

                <div className="modern-card-tags">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="modern-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="modern-card-description">
                  {project.description.length > 100
                    ? `${project.description.substring(0, 100)}...`
                    : project.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
