import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import custom styles
import "./ProjectsSwiper.css";

// Define a interface para os dados do projeto
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demo?: string;
  source?: string;
  technologies: string[];
}

// Interface para as props do componente
interface ResponsiveSwiperProps {
  projects: Project[];
}

// Função para truncar a descrição
const truncateDescription = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({ projects }) => {
  return (
    <div className="projects-section">
      <div className="container">
        <h2 className="section-title">Meus Projetos</h2>
        <p className="section-subtitle">
          Conheça alguns dos meus principais trabalhos
        </p>
        <div className="projects-carousel">
          <Swiper
            className="mySwiper"
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
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
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link demo-link"
                        >
                          <FaExternalLinkAlt /> Demo
                        </a>
                      )}
                      {project.source && (
                        <a
                          href={project.source}
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
      </div>
    </div>
  );
};

export default ResponsiveSwiper;
