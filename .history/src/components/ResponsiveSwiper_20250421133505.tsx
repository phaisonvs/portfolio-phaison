import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectsSwiper.css";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Type definitions for the Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
}

interface ResponsiveSwiperProps {
  projects: Project[];
}

// Função para truncar descrição com número específico de caracteres
const truncateDescription = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;

  // Encontrar o último espaço antes do limite para cortar em uma palavra completa
  const lastSpace = text.substring(0, maxLength).lastIndexOf(" ");
  return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
};

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({ projects }) => {
  return (
    <div className="projects-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
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
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link demo-link"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link source-link"
                    >
                      <FaGithub /> Code
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
