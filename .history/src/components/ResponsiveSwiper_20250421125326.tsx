import React from "react";
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

      <div className="responsive-swiper-container">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 2000, // 2 segundos por slide conforme solicitado
            disableOnInteraction: false, // Continuar mesmo após interação do usuário
            pauseOnMouseEnter: true, // Pausa ao passar o mouse
          }}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={false}
          watchOverflow={true}
          className="responsive-swiper"
          breakpoints={{
            // Quando a largura da viewport for >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // Quando a largura da viewport for >= 480px
            480: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            // Quando a largura da viewport for >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Quando a largura da viewport for >= 992px (desktop)
            992: {
              slidesPerView: 3, // 3 cards por vez em desktop conforme solicitado
              spaceBetween: 25,
            },
          }}
        >
          {limitedItems.map((project, index) => (
            <SwiperSlide key={project.id} className="responsive-swiper-slide">
              <div className="project-card-modern">
                <div className="project-card-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image"
                  />
                </div>

                <div className="project-card-content">
                  {/* Tags movidas acima do título conforme solicitado */}
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

                  {/* Ações sempre visíveis (não dependem do hover) */}
                  <div className="project-card-actions active">
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
