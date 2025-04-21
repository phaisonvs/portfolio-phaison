"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/data/projects"; // Importando o tipo Project

interface ProjectCarouselProps {
  projects: Project[]; // Usando o tipo Project importado
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  // Filtra projetos visíveis aqui, caso não tenha sido feito antes
  const visibleProjects = projects.filter((project) => project.visible);

  return (
    <>
      {/* Títulos com padding do container */}
      <div className="px-6 md:px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
          Projetos em Destaque
        </h2>
        <p className="text-gray-300 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-lg">
          Conheça alguns dos meus principais trabalhos e contribuições
        </p>
      </div>

      {/* Carrossel ocupa largura total, controle de padding/margem nos itens */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        {/* Content sem margem negativa base, com margem em lg+ */}
        <CarouselContent className="lg:-ml-4">
          {visibleProjects.map((project, index) => (
            <CarouselItem
              key={project.id}
              // Remove basis, adiciona flex-shrink-0.
              // min-w para ~1.5 mobile, 2 md, 3 lg.
              // Padding controla espaçamento.
              className="flex-shrink-0 min-w-[80%] sm:min-w-[60%] md:min-w-[48%] lg:min-w-[31%] pl-6 pr-2 sm:pl-6 sm:pr-2 md:pl-6 md:pr-2 lg:pl-4 lg:pr-0"
            >
              <Card className="flex flex-col bg-gray-900/40 dark:bg-gray-900/40 border border-gray-700/30 dark:border-gray-700/30 rounded-xl backdrop-blur-sm shadow-lg hover:border-emerald-800/40 dark:hover:border-emerald-800/40 transition-all h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-square sm:aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 text-xs sm:text-sm mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <Badge
                          key={i}
                          className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 dark:text-gray-300 border border-gray-700/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.gitUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs sm:text-sm border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400"
                          asChild
                        >
                          <a
                            href={project.gitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Código</span>
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="gap-1 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                          asChild
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Demo</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8 gap-4">
          <CarouselPrevious className="static translate-y-0 mx-2 text-emerald-400 hover:text-white border-emerald-800/50 hover:bg-emerald-900/30 h-8 w-8 sm:h-10 sm:w-10" />
          <CarouselNext className="static translate-y-0 mx-2 text-emerald-400 hover:text-white border-emerald-800/50 hover:bg-emerald-900/30 h-8 w-8 sm:h-10 sm:w-10" />
        </div>
      </Carousel>
    </>
  );
}

export default ProjectCarousel;
