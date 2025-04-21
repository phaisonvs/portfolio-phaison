import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "./ProjectsSwiper.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import ProjectCard from "./ProjectCard";
import type { Project } from "../types";

interface FeaturedProjectsCarouselProps {
  items: Project[];
}

const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({
  items,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (
    description: string,
    maxLength: number = 120
  ) => {
    if (description.length <= maxLength) return description;

    // Tenta cortar na última frase completa
    const lastSentence = description.substring(0, maxLength).lastIndexOf(".");
    if (lastSentence > maxLength * 0.7)
      return description.substring(0, lastSentence + 1);

    // Se não encontrar uma frase adequada, corta na última palavra completa
    return (
      description
        .substring(0, maxLength)
        .trim()
        .replace(/[,;.!?]$/, "") + "..."
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="projects-swiper-wrapper">
      <div className="projects-swiper-header">
        <h2 className="projects-swiper-title">Projetos em Destaque</h2>
        <p className="projects-swiper-subtitle">
          Conheça alguns dos projetos que desenvolvi recentemente
        </p>
      </div>
      <div className="swiper-container">
        <Swiper
          onSwiper={setSwiperInstance}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={slidesPerView}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: ".swiper-pagination",
          }}
          className="projects-swiper"
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                title={item.title}
                description={truncateDescription(item.description)}
                image={item.image}
                tags={item.tags}
                url={item.url}
                github={item.github}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-nav-container">
          <div className="swiper-nav-buttons">
            <div className="swiper-button-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
                <path d="M11 12h9" opacity="0.5" />
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
                <path d="M4 12h9" opacity="0.5" />
              </svg>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
