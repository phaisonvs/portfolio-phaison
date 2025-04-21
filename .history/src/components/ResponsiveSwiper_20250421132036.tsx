import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import "./ResponsiveSwiper.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
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
  // Limita o número de itens para 6 conforme solicitado
  const limitedItems = items.slice(0, 6);

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    // Trunca no espaço mais próximo para evitar cortar palavras
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

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

      <div className="swiper-container-wrapper">
        {/* Desktop View - Variante padrão do Swiper */}
        <div className="desktop-swiper-view">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={3}
            spaceBetween={25}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            watchOverflow={true}
            className="responsive-swiper standard-view"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              992: { slidesPerView: 3, spaceBetween: 25 },
            }}
          >
            {limitedItems.map((project) => (
              <SwiperSlide key={project.id} className="responsive-swiper-slide">
                <div className="project-card-modern-horizontal">
                  <div className="project-card-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>

                  <div className="project-card-content">
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

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">
                      {truncateDescription(project.description, 60)}
                    </p>

                    <div className="project-card-actions">
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

          {/* Navegação customizada fora do Swiper (usando classes para conectar) */}
          <div className="swiper-controls-container">
            <div className="swiper-pagination"></div>
            <div className="swiper-navigation">
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </div>

        {/* Mobile View - Com efeito de Cards */}
        <div className="mobile-swiper-view">
          <Swiper
            modules={[Pagination, EffectCards, Autoplay]}
            effect="cards"
            grabCursor={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              el: ".swiper-pagination-mobile",
              clickable: true,
            }}
            loop={true}
            className="responsive-swiper cards-view"
          >
            {limitedItems.map((project) => (
              <SwiperSlide
                key={project.id}
                className="responsive-swiper-slide-mobile"
              >
                <div className="project-card-modern-vertical">
                  <div className="project-card-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>

                  <div className="project-card-content">
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

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">
                      {truncateDescription(project.description, 60)}
                    </p>

                    <div className="project-card-actions">
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

          {/* Paginação para mobile */}
          <div className="swiper-pagination-mobile"></div>
        </div>
      </div>
    </div>
  );
};
