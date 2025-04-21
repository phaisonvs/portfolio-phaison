import React, { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import ProjectCard from "./ProjectCard";
import "./ProjectsSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CustomSwiper } from "./ui/custom-swiper";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  technologies: string[];
}

interface ProjectsSwiperProps {
  projects: Project[];
}

const ProjectsSwiper: React.FC<ProjectsSwiperProps> = ({ projects }) => {
  // Config básica sem lógica de viewport - isso será controlado pelo CSS
  const [spaceBetween, setSpaceBetween] = useState(16);

  return (
    <div className="projects-swiper-container">
      <CustomSwiper
        modules={[Pagination, Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView="auto" // Importante: usar "auto" para deixar o CSS controlar
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="projects-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </div>
  );
};

export default ProjectsSwiper;
