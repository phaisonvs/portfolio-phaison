
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects } from "@/data/projects";

// Animated section component inspired by GreenBank
const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated card component that fades and slides in
const AnimatedCard = ({ 
  children, 
  index = 0 
}: { 
  children: React.ReactNode; 
  index?: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 * index 
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500"
    >
      {children}
    </motion.div>
  );
};

// Parallax heading component
const ParallaxHeading = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  
  return (
    <div ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <motion.h2 
        style={{ y, opacity }}
        className="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-500 dark:from-emerald-400 dark:to-blue-400"
      >
        {text}
      </motion.h2>
    </div>
  );
};

// Horizontal scroll gallery
const HorizontalGallery = ({ images }: { images: string[] }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -500]);
  
  return (
    <div ref={galleryRef} className="relative py-16 md:py-24 overflow-hidden">
      <motion.div 
        style={{ x }} 
        className="flex gap-4 min-w-max"
      >
        {images.map((image, i) => (
          <div 
            key={i} 
            className="w-[350px] h-[250px] rounded-xl overflow-hidden shadow-lg"
          >
            <img src={image} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  
  // References for parallax effects
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    // Check for projects in localStorage (updated by admin panel)
    const savedProjects = localStorage.getItem('projects');
    const projectsToUse = savedProjects ? JSON.parse(savedProjects) : projects;
    
    setAllProjects(projectsToUse);
    
    const foundProject = projectsToUse.find((p) => p.id === id && p.visible);
    
    // Simulate loading delay
    setTimeout(() => {
      setProject(foundProject || null);
      setIsLoading(false);
      
      // Increment view counter (in real scenarios, this would be via API)
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

  // Example images for gallery (in real case, would come from project data)
  const galleryImages = [
    project.image,
    "https://placehold.co/900x600/png",
    "https://placehold.co/900x600/png",
    "https://placehold.co/900x600/png",
    "https://placehold.co/900x600/png",
    "https://placehold.co/900x600/png"
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Immersive Hero Section with Parallax Effect */}
      <motion.div 
        ref={heroRef}
        className="relative h-[90vh] w-full overflow-hidden"
        style={{
          scale: heroScale,
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-center bg-cover"
          style={{ 
            backgroundImage: `url(${project.image})`,
            opacity: heroOpacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="container px-6 relative z-10"
            style={{ y: titleY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Ver projeto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                )}
                
                {project.gitUrl && (
                  <motion.a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white font-medium hover:bg-white/20 transition-colors border border-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>Código fonte</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Back to projects link */}
      <div className="container px-6 py-8">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para projetos
        </Link>
      </div>
      
      {/* Overview Section */}
      <section className="py-16">
        <div className="container px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Visão Geral</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                <AnimatedCard>
                  <h3 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Desafio</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    O principal desafio deste projeto foi criar uma solução digital inovadora que atendesse às necessidades específicas do cliente,
                    proporcionando uma experiência de usuário excepcional e eficiência operacional.
                  </p>
                </AnimatedCard>
                
                <AnimatedCard index={1}>
                  <h3 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Solução</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Desenvolvemos uma plataforma completa com interface intuitiva e recursos avançados, focada em desempenho e escalabilidade.
                    Cada elemento foi cuidadosamente projetado para atender às necessidades do público-alvo.
                  </p>
                </AnimatedCard>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Parallax Heading Section */}
      <ParallaxHeading text="Funcionalidades" />
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container px-6">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Design Intuitivo",
                    description: "Interface limpa e fácil de usar, focada em proporcionar a melhor experiência para usuários finais."
                  },
                  {
                    title: "Alto Desempenho",
                    description: "Otimizado para carregamento rápido e resposta imediata a interações do usuário."
                  },
                  {
                    title: "Responsividade Total",
                    description: "Adaptado para qualquer dispositivo, desde smartphones até monitores de alta resolução."
                  },
                  {
                    title: "Integração API",
                    description: "Conexão perfeita com sistemas existentes através de APIs bem estruturadas."
                  },
                  {
                    title: "Segurança Avançada",
                    description: "Implementação de práticas de segurança de ponta para proteção de dados."
                  },
                  {
                    title: "Escalabilidade",
                    description: "Arquitetura projetada para crescer conforme a demanda aumenta."
                  }
                ].map((feature, index) => (
                  <AnimatedCard key={index} index={index}>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Horizontal Scrolling Gallery */}
      <section className="overflow-hidden py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="container px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Galeria do Projeto</h2>
          </AnimatedSection>
          
          <HorizontalGallery images={galleryImages} />
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section className="py-16">
        <div className="container px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white text-center">Tecnologias Utilizadas</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
              {[
                { name: "React", icon: "https://placehold.co/80x80/png" },
                { name: "TypeScript", icon: "https://placehold.co/80x80/png" },
                { name: "Node.js", icon: "https://placehold.co/80x80/png" },
                { name: "MongoDB", icon: "https://placehold.co/80x80/png" },
                { name: "TailwindCSS", icon: "https://placehold.co/80x80/png" },
                { name: "Framer Motion", icon: "https://placehold.co/80x80/png" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center mb-3">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Next Projects Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800/30">
        <div className="container px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projetos Relacionados</h2>
            
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
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/projects/${relatedProject.id}`} className="block">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{relatedProject.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {relatedProject.description}
                        </p>
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                          <span>Ver detalhes</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Vamos trabalhar juntos?</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Se você gostou deste projeto e quer criar algo incrível, entre em contato comigo.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                <span>Conversar sobre seu projeto</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
