
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUp, ExternalLink, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Project, projects } from "@/data/projects";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { ProjectCarousel } from "@/components/project/ProjectCarousel";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const ProjectSingle = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Use smooth scroll hook
  useSmoothScroll();
  
  // Scroll-based animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);
  
  useEffect(() => {
    // Find project
    const savedProjects = localStorage.getItem('projects');
    const projectsToUse = savedProjects ? JSON.parse(savedProjects) : projects;
    
    const foundProject = projectsToUse.find((p) => p.id === id && p.visible);
    
    // Simulate loading delay
    setTimeout(() => {
      setProject(foundProject || null);
      setIsLoading(false);
    }, 300);
    
    // Handle scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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
              className="inline-flex items-center text-emerald-600 hover:underline"
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Example technologies for the project
  const technologies = [
    { name: "React", icon: "https://placehold.co/40x40/png" },
    { name: "TypeScript", icon: "https://placehold.co/40x40/png" },
    { name: "Tailwind CSS", icon: "https://placehold.co/40x40/png" },
    { name: "Framer Motion", icon: "https://placehold.co/40x40/png" },
    { name: "Node.js", icon: "https://placehold.co/40x40/png" },
    { name: "MongoDB", icon: "https://placehold.co/40x40/png" },
  ];

  // Example images for the carousel
  const projectImages = [
    project.image,
    "https://placehold.co/800x500/png",
    "https://placehold.co/800x500/png",
    "https://placehold.co/800x500/png",
    "https://placehold.co/800x500/png",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <motion.div
        ref={heroRef}
        className="relative h-[80vh] w-full overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{ 
            backgroundImage: `url(${project.image})`,
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-emerald-900/30 border border-emerald-800/50 rounded-full text-emerald-400"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Back button and project links */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para projetos
          </Link>
          
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-600 transition-colors"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700 hover:border-gray-600 bg-transparent transition-colors"
              >
                <Github className="w-4 h-4" />
                Código
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* About the Project */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-12 tracking-wider">SOBRE O PROJETO</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollAnimator>
              <div>
                <h3 className="text-xl font-medium mb-6 text-emerald-400">O Desafio</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.fullDescription || "O principal desafio deste projeto foi criar uma solução digital inovadora que atendesse às necessidades específicas do cliente, proporcionando uma experiência de usuário excepcional e eficiência operacional."}
                </p>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={200}>
              <div>
                <h3 className="text-xl font-medium mb-6 text-emerald-400">A Solução</h3>
                <p className="text-gray-300 leading-relaxed">
                  Desenvolvemos uma plataforma completa com interface intuitiva e recursos avançados, focada em desempenho e escalabilidade. Cada elemento foi cuidadosamente projetado para proporcionar a melhor experiência possível aos usuários finais.
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      {/* Image Carousel */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-12 tracking-wider">GALERIA</h2>
          </ScrollAnimator>
          
          <ProjectCarousel images={projectImages} />
        </div>
      </section>
      
      {/* Technologies Used */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-12 tracking-wider">TECNOLOGIAS</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <ScrollAnimator key={tech.name} delay={index * 100}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                  </div>
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-6">Vamos trabalhar juntos?</h2>
            <p className="text-gray-300 mb-8">
              Se você gostou deste projeto e quer criar algo incrível, entre em contato comigo.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-700 hover:bg-emerald-600 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">Conversar sobre seu projeto</span>
              <div className="absolute left-0 top-0 h-full w-full -translate-x-full bg-emerald-500/20 transform transition-transform duration-700 group-hover:translate-x-0"></div>
            </Link>
          </ScrollAnimator>
        </div>
      </section>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-emerald-700 hover:bg-emerald-600 shadow-lg transition-colors z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectSingle;
