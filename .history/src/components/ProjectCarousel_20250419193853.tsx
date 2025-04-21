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
    <div className="w-full py-12">
      <div className="container mx-auto px-6 md:px-6">
        {" "}
        {/* Mantendo padding consistente */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 mb-8">
            {" "}
            {/* Aumentando margem inferior */}
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center">
              {" "}
              {/* Estilo do título alinhado com outras seções */}
              Projetos em Destaque
            </h2>
            <p className="text-gray-300 dark:text-gray-300 max-w-2xl mx-auto text-lg text-center">
              {" "}
              {/* Estilo do parágrafo alinhado */}
              Conheça alguns dos meus principais trabalhos e contribuições
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="md:-ml-4">
              {visibleProjects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="flex-shrink-0 basis-2/3 pr-4 md:basis-1/2 md:pr-0 md:pl-4 lg:basis-1/3"
                >
                  <Card className="flex flex-col bg-gray-900/40 dark:bg-gray-900/40 border border-gray-700/30 dark:border-gray-700/30 rounded-xl backdrop-blur-sm shadow-lg hover:border-emerald-800/40 dark:hover:border-emerald-800/40 transition-all h-full overflow-hidden">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-video overflow-hidden rounded-t-xl flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 dark:text-gray-300 text-sm mb-4 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 dark:text-gray-300 border border-gray-700/30"
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
                              className="gap-1 border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400"
                              asChild
                            >
                              <a
                                href={project.gitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4" />
                                <span>Código</span>
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button
                              size="sm"
                              className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                              asChild
                            >
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
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
              <CarouselPrevious className="static translate-y-0 mx-2 text-emerald-400 hover:text-white border-emerald-800/50 hover:bg-emerald-900/30" />
              <CarouselNext className="static translate-y-0 mx-2 text-emerald-400 hover:text-white border-emerald-800/50 hover:bg-emerald-900/30" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

// Exportação default para facilitar importação dinâmica se necessário
export default ProjectCarousel;
