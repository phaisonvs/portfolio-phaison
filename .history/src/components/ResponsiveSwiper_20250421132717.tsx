import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "./ResponsiveSwiper.css";

// Importar ícones
import { FiExternalLink, FiGithub } from "react-icons/fi";

// Registrando módulos do Swiper
SwiperCore.use([Pagination, Navigation, Autoplay]);

// Interface para as props dos projetos
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  sourceUrl?: string;
  technologies: string[];
}

// Interface para as props do componente
interface ResponsiveSwiperProps {
  projects: Project[];
  title: string;
  subtitle?: string;
}

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({
  projects,
  title,
  subtitle,
}) => {
  // Função para truncar a descrição
  const truncateDescription = (description: string, maxLength = 120) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength).trim()}...`;
  };

  // Limitando a 6 projetos
  const displayedProjects = projects.slice(0, 6);

  return (
    <div className="basic-swiper-wrapper">
      <div className="basic-swiper-header">
        <h2 className="basic-swiper-title">{title}</h2>
        {subtitle && <p className="basic-swiper-subtitle">{subtitle}</p>}
      </div>

      {displayedProjects.length > 0 ? (
        <div className="basic-swiper-container">
          <Swiper
            className="basic-swiper"
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // Quando a largura da janela é >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Quando a largura da janela é >= 992px
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {displayedProjects.map((project) => (
              <SwiperSlide key={project.id}>
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
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="basic-project-tag">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="basic-project-tag basic-project-tag-more">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <h3 className="basic-project-title">{project.title}</h3>
                    <p className="basic-project-description">
                      {truncateDescription(project.description)}
                    </p>
                    <div className="basic-project-actions">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="basic-project-btn primary"
                        >
                          <FiExternalLink className="basic-icon" />
                          Ver Demo
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="basic-project-btn secondary"
                        >
                          <FiGithub className="basic-icon" />
                          Código
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="basic-swiper-vazio">Nenhum projeto encontrado.</div>
      )}
    </div>
  );
};

export default ResponsiveSwiper;
