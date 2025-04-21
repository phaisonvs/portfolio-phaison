import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "./ProjectsSwiper.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags: string[];
}

export interface FeaturedProjectsCarouselProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

const truncateDescription = (description: string, maxLength: number = 150) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + "...";
};

const FeaturedProjectsCarousel = ({
  projects,
  title = "Projetos em Destaque",
  subtitle = "Conheça alguns dos meus trabalhos mais recentes e relevantes",
}: FeaturedProjectsCarouselProps) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="projects-swiper-wrapper">
      <div className="projects-swiper-header">
        <h2 className="projects-swiper-title">{title}</h2>
        <p className="projects-swiper-subtitle">{subtitle}</p>
      </div>
      <div className="swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={slidesPerView}
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
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-expect-error - Swiper typing issue
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-expect-error - Swiper typing issue
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          className="projects-swiper"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={truncateDescription(project.description)}
                image={project.image}
                liveUrl={project.demo}
                tags={project.tags}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-nav-container">
          <div className="swiper-nav-buttons">
            <div ref={navigationPrevRef} className="swiper-button-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div ref={navigationNextRef} className="swiper-button-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
