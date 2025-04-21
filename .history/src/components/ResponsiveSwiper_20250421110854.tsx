import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProjectCard } from "./ProjectCard"; // Reutilizar o ProjectCard existente
import "./ResponsiveSwiper.css"; // Importar o CSS

// Importar estilos base do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Definir a interface para os projetos, assumindo que já existe uma definição compatível
// Se não existir, precisaria ser definida aqui ou importada
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
}

interface ResponsiveSwiperProps {
  items: Project[];
}

export const ResponsiveSwiper: React.FC<ResponsiveSwiperProps> = ({
  items,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="responsive-swiper-vazio">Nenhum item para exibir.</div>
    );
  }

  return (
    <div className="responsive-swiper-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16} // Espaço inicial entre slides
        slidesPerView={1} // Começa com 1 slide visível em telas pequenas
        navigation // Habilita botões de navegação
        pagination={{ clickable: true }} // Habilita paginação clicável
        breakpoints={{
          // >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          // >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="responsive-swiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id}>
            {/* Reutiliza o ProjectCard para exibir cada item */}
            <ProjectCard
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              liveUrl={item.liveUrl}
              tags={item.tags}
              index={index} // Passa o índice se o Card precisar
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
