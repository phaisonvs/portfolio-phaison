import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "./ResponsiveSwiper.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ArrowUpRight, ExternalLink } from "lucide-react";

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
  const paginationRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    // Trunca no espaço mais próximo para evitar cortar palavras
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  // Movendo a páginação para nosso container personalizado
  useEffect(() => {
    if (swiperInstance && paginationRef.current) {
      // Mover os bullets de paginação para nosso container
      const bullets = document.querySelector(".swiper-pagination");
      if (bullets && paginationRef.current) {
        paginationRef.current.appendChild(bullets);
      }
    }
  }, [swiperInstance]);

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
    return (
      <div className="responsive-swiper-vazio">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="responsive-swiper">
      <div className="responsive-swiper-header">
        <h2 className="responsive-swiper-title">Projetos em Destaque</h2>
        <p className="responsive-swiper-subtitle">
          Confira alguns dos meus trabalhos mais recentes
        </p>
      </div>

      <div className="responsive-swiper-container">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
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
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
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
          className="responsive-swiper"
          watchOverflow={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: "auto",
              spaceBetween: 20,
            },
          }}
          onSwiper={setSwiperInstance}
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
                    {/* Badges/tags com mais visibilidade */}
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
                  </div>
                </div>

                <div className="project-card-content">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">
                    {truncateDescription(project.description, 60)}
                  </p>

                  {/* Ações movidas para o conteúdo para melhor visualização */}
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
                        <span>Demo</span>
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
