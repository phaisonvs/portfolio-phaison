import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";
import "./ResponsiveSwiper.css";
import {
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interface para os projetos
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
  // Limita o número de itens para 6 conforme solicitado
  const limitedItems = items.slice(0, 6);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Opções do Embla: configurações que emulam o comportamento do Swiper anterior
  const options = {
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  };

  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  // Inicialização do carrossel
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
    WheelGesturesPlugin(),
  ]);

  // Função para truncar a descrição de forma mais inteligente
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    // Trunca no espaço mais próximo para evitar cortar palavras
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  // Controles de navegação
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Atualiza o índice selecionado quando o carrossel rola
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Configura o carrossel após montagem
  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    // Limpa event listeners
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!items || items.length === 0) {
    return (
      <div className="responsive-swiper-vazio">Nenhum projeto para exibir.</div>
    );
  }

  return (
    <div className="responsive-swiper-wrapper">
      <div className="responsive-swiper-header">
        <h2 className="responsive-swiper-title">Projetos em Destaque</h2>
        <p className="responsive-swiper-subtitle">
          Confira alguns dos meus trabalhos mais recentes
        </p>
      </div>

      <div className="embla-carousel-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {limitedItems.map((project, index) => (
              <div key={project.id} className="embla__slide">
                <div className="project-card-modern">
                  <div className="project-card-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>

                  <div className="project-card-content">
                    {/* Tags movidas acima do título conforme solicitado */}
                    <div className="project-card-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag project-tag-more">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">
                      {truncateDescription(project.description, 60)}
                    </p>

                    {/* Ações sempre visíveis (não dependem do hover) */}
                    <div className="project-card-actions active">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-action-btn primary"
                        >
                          <ExternalLink className="action-icon" />
                          <span>Demo</span>
                        </a>
                      )}
                      <a
                        href={`/project/${project.id}`}
                        className="project-card-action-btn secondary"
                      >
                        <ArrowUpRight className="action-icon" />
                        <span>Detalhes</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="embla-buttons">
          <button
            className="embla-button embla-button-prev"
            onClick={scrollPrev}
          >
            <ChevronLeft />
          </button>
          <button
            className="embla-button embla-button-next"
            onClick={scrollNext}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Pontos de paginação */}
        <div className="embla-dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla-dot ${
                index === selectedIndex ? "embla-dot--selected" : ""
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
