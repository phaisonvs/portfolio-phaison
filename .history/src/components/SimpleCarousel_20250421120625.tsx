import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import "./SimpleCarousel.css";
import Link from "next/link";
import Image from "next/image";

// Registrar os módulos do Swiper
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

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
  className?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({
  title = "Projetos em destaque",
  items,
  className = "",
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
    <div className={`modern-carousel-container ${className}`}>
      <h2 className="modern-carousel-title">{title}</h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
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
        className="modern-carousel"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: "auto",
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
