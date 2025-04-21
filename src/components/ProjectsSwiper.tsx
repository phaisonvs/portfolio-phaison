import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { ProjectCard } from "./ProjectCard";
import "./ProjectsSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CustomSwiper } from "./ui/custom-swiper";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
}

interface ProjectsSwiperProps {
  projects: Project[];
}

export function ProjectsSwiper({ projects }: ProjectsSwiperProps) {
  // Config básica sem lógica de viewport - isso será controlado pelo CSS
  const [spaceBetween, setSpaceBetween] = useState(16);

  if (!projects?.length) {
    return (
      <div className="text-center py-10 text-gray-300">
        Nenhum projeto em destaque disponível
      </div>
    );
  }

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
        {projects.map((project, index) => (
          <SwiperSlide key={project.id}>
            <ProjectCard
              id={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              liveUrl={project.liveUrl}
              tags={project.tags}
              index={index}
            />
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </div>
  );
}
