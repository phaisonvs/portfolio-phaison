"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Interface para os dados do projeto (use a interface já existente ou defina aqui se necessário)
// import { Project as ProjectData } from "@/data/projects"; // Exemplo se a interface já existe
interface ProjectData {
  id: number | string; // Permite string ou number
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string; // Alterado para liveUrl para corresponder aos dados existentes
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  return (
    <Card
      className={`overflow-hidden h-full flex flex-col ${className} bg-gray-900/40 backdrop-blur-sm border border-gray-700/30`}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex-1 flex flex-col p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-gray-800/50 backdrop-blur-sm text-gray-300 border border-gray-700/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm flex-1">{project.description}</p>
      </CardContent>
      {project.liveUrl && (
        <CardFooter className="p-5 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600"
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Ver projeto <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

interface ProjectsCarouselProps {
  title?: string;
  subtitle?: string;
  projects: ProjectData[];
}

export const ProjectsCarousel = ({
  title = "Projetos em Destaque",
  subtitle = "Conheça alguns dos meus melhores trabalhos",
  projects,
}: ProjectsCarouselProps) => {
  // Filtrar projetos visíveis, se necessário (assumindo que `projects` já está filtrado)
  const visibleProjects = projects; // Ou aplique filtro se 'projects' vier de uma fonte não filtrada

  if (!visibleProjects || visibleProjects.length === 0) {
    return null; // Não renderiza nada se não houver projetos
  }

  return (
    <section className="py-12 md:py-20">
      {" "}
      {/* Removido bg-background para usar o fundo global */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
            {title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Carousel Desktop */}
        <div className="hidden md:block">
          <Carousel
            opts={{
              align: "start",
              loop: visibleProjects.length > 3, // Loop apenas se houver mais slides que o visível
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {visibleProjects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    {" "}
                    {/* Garante que o card ocupe toda a altura */}
                    <ProjectCard project={project} className="h-full" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static transform-none mx-2 bg-gray-800/50 hover:bg-gray-700/70 text-white border-gray-700/30" />
              <CarouselNext className="relative static transform-none mx-2 bg-gray-800/50 hover:bg-gray-700/70 text-white border-gray-700/30" />
            </div>
          </Carousel>
        </div>

        {/* Swiper Mobile */}
        <div className="md:hidden">
          <MobileProjectSwiper projects={visibleProjects} />
        </div>
      </div>
    </section>
  );
};

interface MobileProjectSwiperProps {
  projects: ProjectData[];
}

const MobileProjectSwiper = ({ projects }: MobileProjectSwiperProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -50 && currentIndex < projects.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (x >= 50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        style={{ x: dragX }}
        animate={{ translateX: `-${currentIndex * 100}%` }}
        onDragEnd={onDragEnd}
        transition={{ type: "spring", damping: 20 }}
        className="flex w-full cursor-grab active:cursor-grabbing"
      >
        {projects.map((project) => (
          <div key={project.id} className="w-full flex-shrink-0 px-2">
            <div className="h-full">
              {" "}
              {/* Garante altura no mobile */}
              <ProjectCard project={project} className="h-full" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Indicadores de paginação */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-emerald-500" : "bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação mobile */}
      <div className="flex justify-center mt-4 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-white border-gray-700/30"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-white border-gray-700/30"
          onClick={() =>
            setCurrentIndex((prev) => Math.min(projects.length - 1, prev + 1))
          }
          disabled={currentIndex === projects.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
    </div>
  );
};

// Não precisamos do componente Demo neste arquivo
// export default ProjectsCarousel; // Exportar o componente principal
