import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "./ResponsiveSwiper.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

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

  if (!items || items.length === 0) {
    return (
      <div className="responsive-swiper-vazio">Nenhum projeto para exibir.</div>
    );
  }

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    // Trunca no espaço mais próximo para evitar cortar palavras
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

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
            rotate: 5, // Reduzido para um efeito mais sutil em cards horizontais
            stretch: 0,
            depth: 50, // Reduzido para cards com altura menor
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="responsive-swiper"
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
                    {/* Badges/tags no topo da imagem - limitadas a 2 para economizar espaço */}
                    <div className="project-card-tags">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="project-tag project-tag-more">
                          +{project.tags.length - 2}
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
      </div>
    </div>
  );
};
