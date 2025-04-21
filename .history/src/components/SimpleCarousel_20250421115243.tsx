import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./SimpleCarousel.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/pagination";

// Interface para os projetos (reutilizada ou definida conforme necessário)
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
      <div className="simple-carousel-vazio">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="simple-carousel-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true, // Adiciona um efeito visual aos bullets
        }}
        breakpoints={{
          // >= 500px: Exibir 3 slides
          500: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="simple-carousel"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="simple-carousel-slide">
            <div className="simple-project-card">
              <div className="simple-card-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="simple-card-image"
                />
              </div>
              <div className="simple-card-content">
                <h3 className="simple-card-title">{item.title}</h3>
                <p className="simple-card-description">
                  {/* Truncar descrição se necessário */}
                  {item.description.length > 80
                    ? `${item.description.substring(0, 80)}...`
                    : item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
