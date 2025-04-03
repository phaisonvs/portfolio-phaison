
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Code, Database, Server, Globe, LayoutGrid } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects } from "@/data/projects";
import { Feature } from "@/components/ui/feature-with-image-carousel";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectImageGrid } from "@/components/project/ProjectImageGrid";
import { ProjectParallax } from "@/components/project/ProjectParallax";
import { ProjectFeatures } from "@/components/project/ProjectFeatures";
import { ProjectTimeline } from "@/components/project/ProjectTimeline";

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

  // Dados para as novas seções
  const projectFeatures = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Frontend",
      description: "Desenvolvimento de interfaces modernas e responsivas utilizando as mais recentes tecnologias web."
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend",
      description: "Implementação de APIs robustas e escaláveis para suportar as funcionalidades do sistema."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Banco de Dados",
      description: "Modelagem e estruturação otimizada de dados para garantir performance e segurança."
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Design centrado no usuário com foco em usabilidade e experiência agradável."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Implantação",
      description: "Publicação do projeto em ambiente de produção com configuração de CI/CD."
    }
  ];

  const timelineItems = [
    {
      title: "Planejamento",
      date: "Janeiro 2023",
      description: "Definição de requisitos, escopo e arquitetura do projeto."
    },
    {
      title: "Design",
      date: "Fevereiro 2023",
      description: "Criação de wireframes, protótipos e definição da identidade visual."
    },
    {
      title: "Desenvolvimento",
      date: "Março - Maio 2023",
      description: "Implementação do frontend e backend, integrações com APIs externas."
    },
    {
      title: "Testes",
      date: "Junho 2023",
      description: "Testes de usabilidade, performance e segurança para garantir qualidade."
    },
    {
      title: "Lançamento",
      date: "Julho 2023",
      description: "Publicação do projeto e início do monitoramento em produção."
    }
  ];

  // Imagens de exemplo para o grid (em um cenário real, viriam do projeto)
  const projectImages = [
    project.image,
    "https://placehold.co/800x450/png",
    "https://placehold.co/800x450/png", 
    "https://placehold.co/800x450/png",
    "https://placehold.co/800x450/png",
    "https://placehold.co/800x450/png"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Nova Hero Section com efeito parallax */}
      <ProjectHero 
        image={project.image} 
        title={project.title} 
      />
      
      {/* Botões e informações principais */}
      <motion.section 
        className="pt-12 pb-8"
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
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-sky-100 dark:bg-navy-800 rounded-full text-sky-700 dark:text-sky-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-4xl text-lg">
            {project.fullDescription || project.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 dark:bg-blue-600 text-white font-medium hover:bg-sky-600 dark:hover:bg-blue-700 transition-colors btn-press"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors btn-press"
              >
                <Github className="w-4 h-4" />
                Ver código
              </a>
            )}
          </div>
        </div>
      </motion.section>
      
      {/* Feature Section with Image Carousel (Mantida) */}
      <Feature 
        title={`Detalhes do projeto ${project.title}`}
        description={project.fullDescription || project.description}
        badgeText={project.tags[0] || "Projeto"}
        images={[project.image, ...Array(4).fill("https://placehold.co/800x450/png")]}
      />
      
      {/* Nova seção de Grid de Imagens */}
      <ProjectImageGrid 
        images={projectImages}
        title="Galeria do Projeto"
      />
      
      {/* Nova seção com efeito Parallax */}
      <ProjectParallax 
        image={project.image}
        title="Sobre o Projeto"
        description="Este projeto foi desenvolvido com o objetivo de criar uma solução inovadora para os desafios enfrentados pelos usuários. Utilizando tecnologias modernas e metodologias ágeis, conseguimos entregar uma plataforma robusta e escalável que atende às necessidades específicas do mercado."
      />
      
      {/* Nova seção 1: Visão Geral do Projeto (Mantida) */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white dark:from-navy-800/20 dark:to-navy-900">
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
      
      {/* Nova seção de Features */}
      <ProjectFeatures 
        features={projectFeatures}
        title="Tecnologias e Funcionalidades"
      />
      
      {/* Nova seção de Timeline */}
      <ProjectTimeline 
        items={timelineItems}
        title="Linha do Tempo do Projeto"
      />
      
      {/* Related Projects (Mantida) */}
      <section className="py-16 bg-gradient-to-b from-sky-50/30 to-white dark:from-navy-800/50 dark:to-navy-900">
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
                    <div className="h-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{relatedProject.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
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
