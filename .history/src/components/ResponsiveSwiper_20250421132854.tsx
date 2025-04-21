import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// Importar estilos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProjectsSwiper.css";

// Interface para as propriedades de um projeto
interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
}

// Interface para as props do componente
interface ResponsiveSwiperProps {
  title: string;
  subtitle?: string;
  projects: Project[];
}

// Função para truncar a descrição
const truncateDescription = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({
  title,
  subtitle,
  projects,
}) => {
  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="projects-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // Mobile
              576: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              // Tablet
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // Desktop
              992: {
                slidesPerView: 3,
                spaceBetween: 40,
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
                          className="project-link demo-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt /> Demo
                        </a>
                      )}
                      {project.sourceLink && (
                        <a
                          href={project.sourceLink}
                          className="project-link source-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveSwiper;
