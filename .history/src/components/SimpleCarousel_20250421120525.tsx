import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./SimpleCarousel.css";
import Link from "next/link";
import Image from "next/image";

// Definição da interface para os items do carrossel
export interface SimpleCarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

// Props do componente de carrossel
interface SimpleCarouselProps {
  title?: string;
  items: SimpleCarouselItem[];
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({
  title = "Projetos em destaque",
  items,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="modern-carousel-container">
        <h2 className="modern-carousel-title">{title}</h2>
        <div className="modern-carousel-empty">
          Nenhum projeto disponível no momento.
        </div>
      </div>
    );
  }

  return (
    <div className="modern-carousel-container">
      <h2 className="modern-carousel-title">{title}</h2>
      <Swiper
        className="modern-carousel"
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="modern-carousel-slide">
            <div className="modern-project-card">
              <div className="modern-card-image-container">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="modern-card-image w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                />
                <div className="modern-card-overlay">
                  <Link
                    href={item.link}
                    className="view-project-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Projeto
                  </Link>
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
