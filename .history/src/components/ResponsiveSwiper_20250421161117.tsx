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
  const paginationRef = useRef<HTMLDivElement>(null);

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
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          // Removemos os controles padrão para adicionar os nossos customizados
          navigation={false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            // Especifica um elemento customizado
            el: ".swiper-pagination",
          }}
          className="responsive-swiper"
          watchOverflow={true}
          breakpoints={{
            // Ajustado para telas menores, mas pode precisar de refinamento
            320: {
              slidesPerView: 1.2,
              spaceBetween: 15, // Reduzido para acomodar melhor
            },
            // Exibe 3 slides a partir de 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // Mantém 3 slides para telas maiores, pode ajustar se necessário
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
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

        {/* Container para navegação customizada */}
        <div className="swiper-nav-container">
          {/* Container para paginação customizada */}
          <div className="swiper-pagination-container" ref={paginationRef}>
            {/* A paginação do Swiper será movida para cá via JavaScript */}
            <div className="swiper-pagination"></div>
          </div>

          {/* Container para botões de navegação customizados */}
          <div className="swiper-nav-buttons">
            <button
              className="swiper-button-prev"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="swiper-button-next"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Próximo slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
