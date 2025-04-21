import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectsSwiper.css";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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
  if (!text) return "";
  if (text.length <= maxLength) return text;

  // Encontrar o último espaço antes do limite para cortar em uma palavra completa
  const lastSpace = text.substring(0, maxLength).lastIndexOf(" ");
  return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
};

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div className="projects-carousel">Nenhum projeto encontrado</div>;
  }

  return (
    <div className="projects-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        spaceBetween={15}
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
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
        className="mySwiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {truncateDescription(project.description)}
                </p>
                <div className="project-tech">
                  {project.technologies &&
                    project.technologies.map((tech, index) => (
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
