import React, { useRef } from "react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProjectsSliderProps {
  projects: Project[];
}

export function FeaturedProjectsSlider({
  projects,
}: FeaturedProjectsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const visibleProjects = projects.filter((p) => p.featured && p.visible);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.75; // Scroll ~75% of container width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!visibleProjects.length) {
    return null; // Don't render anything if no featured projects
  }

  return (
    <div className="featured-projects-slider">
      {/* Título e Descrição */}
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
          Projetos em Destaque
        </h2>
        <p className="text-gray-300 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-lg">
          Conheça alguns dos meus principais trabalhos e contribuições
        </p>
      </div>

      {/* Scroll Container com Snap */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "relative flex overflow-x-auto pb-6 scroll-smooth",
          "snap-x snap-mandatory scroll-pl-6", // Snap scrolling, starting aligned with container padding
          "md:overflow-visible md:pb-0 md:snap-none" // Disable snap and overflow on larger screens
        )}
      >
        {/* Flex Wrapper for Cards */}
        <div className="flex flex-nowrap gap-4 md:gap-6 px-6 md:px-0">
          {" "}
          {/* Padding in container, gap between items */}
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className={cn(
                "flex-shrink-0 w-[75%] snap-start", // Mobile: ~1.5 cards (75% width + gap)
                "sm:w-[65%]", // Small Adjustment
                "md:w-[calc(50%-0.75rem)]", // Medium: 2 cards (50% minus half gap)
                "lg:w-[calc(33.333%-1rem)]" // Large: 3 cards (33.3% minus adjusted gap)
              )}
            >
              {/* Card Structure (Similar visual style) */}
              <div className="card-container h-full flex flex-col bg-gray-900/40 dark:bg-gray-900/40 border border-gray-700/30 dark:border-gray-700/30 rounded-xl backdrop-blur-sm shadow-lg hover:border-emerald-800/40 dark:hover:border-emerald-800/40 transition-all overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video w-full flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Hidden on Desktop where scrollbar is less intrusive) */}
      <div className="flex justify-center mt-6 gap-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-emerald-800/50 hover:bg-emerald-900/30 text-emerald-400"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-emerald-800/50 hover:bg-emerald-900/30 text-emerald-400"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default FeaturedProjectsSlider;
