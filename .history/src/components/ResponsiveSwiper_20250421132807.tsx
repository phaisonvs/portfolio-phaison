import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./ProjectsSwiper.css";

// Importar ícones
import { FiExternalLink, FiGithub } from "react-icons/fi";

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
  const truncateDescription = (
    description: string,
    maxLength: number = 100
  ) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="projects-carousel">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
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
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link demo-link"
                        >
                          <FiExternalLink /> Demo
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link source-link"
                        >
                          <FiGithub /> Source
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
