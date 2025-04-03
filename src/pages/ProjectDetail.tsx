
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black dark:bg-blue-600 text-white dark:text-white font-medium hover:bg-gray-900 dark:hover:bg-blue-700 transition-colors btn-press"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors btn-press"
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
      
      {/* Nova Seção 1: Visão Geral do Projeto */}
      <section className="py-16 bg-gray-50 dark:bg-navy-800/20">
        <div className="container">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-10 text-center">Visão Geral do Projeto</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimator delay={100}>
              <div className="bg-white dark:bg-navy-700/30 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">01</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Desafio</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  O principal desafio deste projeto foi criar uma solução que combinasse estética moderna com funcionalidade 
                  intuitiva, atendendo às expectativas específicas do cliente.
                </p>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={200}>
              <div className="bg-white dark:bg-navy-700/30 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">02</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Abordagem</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilizamos metodologias ágeis para desenvolver e refinar o projeto, trabalhando de maneira iterativa
                  com feedback constante para garantir que a solução atendesse às necessidades.
                </p>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={300}>
              <div className="bg-white dark:bg-navy-700/30 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 dark:text-green-400 text-xl font-bold">03</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Resultado</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  O resultado final foi uma plataforma robusta e escalável que não apenas atendeu, 
                  mas superou as expectativas iniciais, proporcionando uma experiência de usuário excepcional.
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      {/* Nova Seção 2: Tecnologias Utilizadas */}
      <section className="py-16">
        <div className="container">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-10 text-center">Tecnologias Utilizadas</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimator>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://placehold.co/800x600/png" 
                  alt="Tecnologias"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={200}>
              <div className="flex flex-col justify-center h-full">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-navy-700/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.tags[0] || "Frontend"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Desenvolvimento de interfaces modernas e responsivas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-navy-700/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-purple-500 dark:bg-purple-600 flex items-center justify-center text-white">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.tags[1] || "Backend"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Implementação de APIs e lógica de negócio.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-navy-700/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-green-500 dark:bg-green-600 flex items-center justify-center text-white">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.tags[2] || "Database"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Armazenamento e gerenciamento de dados.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-navy-700/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-yellow-500 dark:bg-yellow-600 flex items-center justify-center text-white">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.tags[3] || "DevOps"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Infraestrutura, CI/CD e monitoramento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      {/* Nova Seção 3: Fases do Projeto */}
      <section className="py-16 bg-gray-50 dark:bg-navy-800/20">
        <div className="container">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold mb-10 text-center">Fases do Projeto</h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ScrollAnimator delay={100}>
              <div className="rounded-xl bg-white dark:bg-navy-700/30 overflow-hidden shadow-sm">
                <div className="h-48 bg-blue-100 dark:bg-blue-900/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Pesquisa</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Análise de requisitos e pesquisa de mercado para fundamentar o desenvolvimento.
                  </p>
                </div>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={200}>
              <div className="rounded-xl bg-white dark:bg-navy-700/30 overflow-hidden shadow-sm">
                <div className="h-48 bg-purple-100 dark:bg-purple-900/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Design</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Criação do design de interface e experiência do usuário.
                  </p>
                </div>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={300}>
              <div className="rounded-xl bg-white dark:bg-navy-700/30 overflow-hidden shadow-sm">
                <div className="h-48 bg-green-100 dark:bg-green-900/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Desenvolvimento</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Implementação do código e funcionalidades do sistema.
                  </p>
                </div>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={400}>
              <div className="rounded-xl bg-white dark:bg-navy-700/30 overflow-hidden shadow-sm">
                <div className="h-48 bg-yellow-100 dark:bg-yellow-900/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Lançamento</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Publicação e monitoramento do projeto em produção.
                  </p>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
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
