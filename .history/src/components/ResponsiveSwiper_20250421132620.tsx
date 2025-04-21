import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import "./ResponsiveSwiper.css";

// Importar estilos base do Swiper
import "swiper/css";
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

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    // Trunca no espaço mais próximo para evitar cortar palavras
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  if (!items || items.length === 0) {
    return (
      <div className="basic-swiper-vazio">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="basic-swiper-wrapper">
      <div className="basic-swiper-header">
        <h2 className="basic-swiper-title">Projetos em Destaque</h2>
        <p className="basic-swiper-subtitle">
          Confira alguns dos meus trabalhos mais recentes
        </p>
      </div>

      <div className="basic-swiper-container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="basic-swiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {limitedItems.map((project) => (
            <SwiperSlide key={project.id} className="basic-swiper-slide">
              <div className="basic-project-card">
                <div className="basic-project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="basic-project-img"
                  />
                </div>
                <div className="basic-project-content">
                  <div className="basic-project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="basic-project-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="basic-project-tag basic-project-tag-more">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <h3 className="basic-project-title">{project.title}</h3>
                  <p className="basic-project-description">
                    {truncateDescription(project.description, 100)}
                  </p>

                  <div className="basic-project-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="basic-project-btn primary"
                      >
                        <span>Demo</span>
                        <ExternalLink className="basic-icon" />
                      </a>
                    )}
                    <a
                      href={`/project/${project.id}`}
                      className="basic-project-btn secondary"
                    >
                      <span>Detalhes</span>
                      <ArrowUpRight className="basic-icon" />
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
