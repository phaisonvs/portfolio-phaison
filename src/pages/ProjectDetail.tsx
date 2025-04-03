
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects } from "@/data/projects";
import { Feature } from "@/components/ui/feature-with-image-carousel";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);

  useEffect(() => {
    // Verificar se há projetos no localStorage (atualizados pelo painel admin)
    const savedProjects = localStorage.getItem('projects');
    const projectsToUse = savedProjects ? JSON.parse(savedProjects) : projects;
    
    setAllProjects(projectsToUse);
    
    const foundProject = projectsToUse.find((p) => p.id === id && p.visible);
    
    // Simular um atraso de carregamento
    setTimeout(() => {
      setProject(foundProject || null);
      setIsLoading(false);
      
      // Incrementar contador de visualizações (em situação real, seria via API)
      if (foundProject) {
        const updatedProjects = projectsToUse.map(p => {
          if (p.id === foundProject.id) {
            return {...p, views: p.views + 1};
          }
          return p;
        });
        
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      }
    }, 300);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para projetos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Project Header */}
      <motion.section 
        className="pt-32 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para projetos
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.fullDescription || project.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver projeto
              </a>
            )}
            
            {project.gitUrl && (
              <a
                href={project.gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                Ver código
              </a>
            )}
          </div>
        </div>
      </motion.section>
      
      {/* Project Image */}
      <section className="pb-16">
        <div className="container">
          <ScrollAnimator>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollAnimator>
        </div>
      </section>
      
      {/* Feature Section with Image Carousel */}
      <Feature 
        title={`Detalhes do projeto ${project.title}`}
        description={project.fullDescription || project.description}
        badgeText={project.tags[0] || "Projeto"}
        images={[project.image, ...Array(4).fill("https://placehold.co/800x450/png")]}
      />
      
      {/* Related Projects */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container">
          <ScrollAnimator>
            <h2 className="text-2xl font-bold mb-8">Projetos Relacionados</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProjects
              .filter(
                (p) => 
                  p.id !== project?.id && 
                  p.visible && 
                  p.tags.some((tag) => project?.tags.includes(tag))
              )
              .slice(0, 3)
              .map((relatedProject, index) => (
                <ScrollAnimator key={relatedProject.id} delay={index * 100}>
                  <Link to={`/projects/${relatedProject.id}`} className="block h-full">
                    <div className="h-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{relatedProject.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimator>
              ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
