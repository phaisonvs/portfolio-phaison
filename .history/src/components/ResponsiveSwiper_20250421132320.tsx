import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectFade, Pagination, Autoplay, Navigation } from "swiper/modules";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import "./ResponsiveSwiper.css";

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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

  // Navegar para um slide específico
  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className="modern-swiper-wrapper">
      <div className="modern-swiper-header">
        <h2 className="modern-swiper-title">Projetos em Destaque</h2>
        <p className="modern-swiper-subtitle">
          Confira alguns dos meus trabalhos mais recentes
        </p>
      </div>

      <div className="modern-swiper-container">
        <Swiper
          modules={[EffectFade, Pagination, Autoplay, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".modern-swiper-button-next",
            prevEl: ".modern-swiper-button-prev",
          }}
          pagination={{
            el: ".modern-swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            bulletClass: "modern-swiper-bullet",
            bulletActiveClass: "modern-swiper-bullet-active",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          loop={true}
          className="modern-swiper"
        >
          {limitedItems.map((project, index) => (
            <SwiperSlide key={project.id} className="modern-swiper-slide">
              <div className="modern-project-card">
                <div className="modern-project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="img-cover"
                  />
                  <div className="modern-project-overlay"></div>
                </div>
                <div className="modern-project-content">
                  <div className="modern-project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="modern-project-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="modern-project-tag modern-project-tag-more">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <h3 className="modern-project-title">{project.title}</h3>
                  <p className="modern-project-description">
                    {truncateDescription(project.description, 120)}
                  </p>

                  <div className="modern-project-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modern-project-btn primary"
                      >
                        <span>Ver Demo</span>
                        <ExternalLink className="modern-icon" />
                      </a>
                    )}
                    <a
                      href={`/project/${project.id}`}
                      className="modern-project-btn secondary"
                    >
                      <span>Detalhes</span>
                      <ArrowUpRight className="modern-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegação e paginação customizadas */}
        <div className="modern-swiper-controls">
          <div className="modern-swiper-pagination"></div>

          <div className="modern-swiper-navigation">
            <button className="modern-swiper-button-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="modern-swiper-counter">
              <span className="current">
                {(activeIndex % limitedItems.length) + 1}
              </span>
              <span className="separator">/</span>
              <span className="total">{limitedItems.length}</span>
            </div>
            <button className="modern-swiper-button-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Miniaturas de navegação */}
      <div className="modern-swiper-thumbnails">
        {limitedItems.map((project, index) => (
          <div
            key={`thumb-${project.id}`}
            className={`modern-swiper-thumbnail ${
              index === activeIndex % limitedItems.length ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            <img
              src={project.image}
              alt={`Miniatura ${project.title}`}
              className="img-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
