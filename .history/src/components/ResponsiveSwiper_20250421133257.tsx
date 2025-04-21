import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// Importações de estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProjectsSwiper.css";

// Interface para definir o formato dos dados de projeto
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

// Props do componente ResponsiveSwiper
interface ResponsiveSwiperProps {
  projects: Project[];
}

// Função para truncar a descrição se for muito longa
const truncateDescription = (description: string, maxLength: number = 120) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + "...";
};

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({ projects }) => {
  return (
    <div className="projects-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={{
          // quando a largura da viewport é >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // quando a largura da viewport é >= 480px
          480: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          // quando a largura da viewport é >= 640px
          640: {
            slidesPerView: 1.8,
            spaceBetween: 15,
          },
          // quando a largura da viewport é >= 768px
          768: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          // quando a largura da viewport é >= 992px
          992: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="project-card">
              <div className="project-image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {truncateDescription(project.description)}
                </p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link demo-link"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link source-link"
                    >
                      <FaGithub /> Código
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ResponsiveSwiper;
