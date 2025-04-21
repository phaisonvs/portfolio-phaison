import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { projects } from "@/data/projects";

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(
    projects.filter((p) => p.visible)
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.filter((p) => p.visible).flatMap((project) => project.tags)
    )
  ).sort();

  // Filter projects based on selected tag and search query
  useEffect(() => {
    let result = projects.filter((p) => p.visible);

    if (selectedTag) {
      result = result.filter((project) => project.tags.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [selectedTag, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleTagClick = (tag: string) => {
    // Toggle the tag if it's already selected
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background global unificado */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,7,18,0.70) 0%, rgba(3,7,18,0.85) 100%)",
          }}
        ></div>
        <div
          className="global-background-image absolute inset-0 z-[-2]"
          style={{
            backgroundImage: 'url("/src/img/background.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            willChange: "transform", // Mantém para otimização
            transition: "transform 0.3s ease-out", // Mantém transição base
            opacity: 0.4,
            filter: "contrast(1.2) brightness(0.65) blur(0px)",
            transform: "scale(1.1)", // Escala fixa inicial
            transformOrigin: "center center",
          }}
        ></div>
      </div>

      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container">
          <ScrollAnimator>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Projetos</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Uma seleção de projetos que desenvolvi. Cada um demonstra
              diferentes habilidades e tecnologias.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <ScrollAnimator className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition-all"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </ScrollAnimator>

            <ScrollAnimator className="w-full md:w-2/3" delay={100}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    selectedTag === null
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  Todos
                </button>

                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      selectedTag === tag
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <ScrollAnimator key={project.id} delay={index * 100}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    liveUrl={project.liveUrl}
                    tags={project.tags}
                    index={index}
                  />
                </ScrollAnimator>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar seus filtros ou termos de busca.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
