
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Download, Github, Linkedin, Mail, Twitter, ArrowRight, CheckCircle2, ExternalLink, PlayCircle, FileText, CreditCard, Scan } from "lucide-react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { testimonials } from "@/data/testimonials";
import { setupScrollAnimations } from "@/utils/scrollAnimation";
import { Tiles } from "@/components/ui/tiles";
import ActionButton from "@/components/ui/action-button";
import { TypeAnimationEnhanced } from "@/components/ui/TypeAnimationEnhanced";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  // Use the smooth scroll hook
  useSmoothScroll();

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // The path to your PDF file
      link.download = 'resume.pdf';
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  useEffect(() => {
    // Configure scroll animations
    const cleanupScrollAnimations = setupScrollAnimations();

    return () => {
      // Clean up the observers when component unmounts
      cleanupScrollAnimations();
    };
  }, []);

  const featuredProjects = projects.filter(
    (project) => project.featured && project.visible
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tiles for background */}
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles 
              rows={30} 
              cols={12} 
              tileSize="md"
              className="h-full"
            />
            <div className="tiles-overlay"></div>
          </div>
        </div>
        
        <div className="container px-6 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-emerald-50 dark:border-emerald-900/20 shrink-0"
              variants={heroItemVariants}
            >
              <img 
                src="/lovable-uploads/1d1a30fb-6f2d-4525-94d3-9dd652079284.png" 
                alt="Profile"
                className="w-full h-full object-cover" 
              />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.p 
                className="text-sm text-emerald-700 dark:text-emerald-400 mb-2"
                variants={heroItemVariants}
              >
                Milton Ivan • Desenvolvedor Javascript Profissional
              </motion.p>
              
              <motion.div 
                className="typing-container mb-4"
                variants={heroItemVariants}
              >
                <TypeAnimationEnhanced
                  sequence={[
                    'Criando valor para o crescimento dos negócios através do código.',
                    'Soluções digitais para o mundo real.',
                    'Transformando ideias em código.',
                  ]}
                  wrapper="h1"
                  speed={50} // Slower speed for better readability
                  deletionSpeed={30}
                  pauseDuration={4000} // 4 seconds pause when text is complete
                  repeat={Infinity}
                  cursor={true}
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-balance leading-tight"
                />
              </motion.div>
              
              <motion.div 
                className="flex gap-4 mt-2"
                variants={heroItemVariants}
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:example@example.com" 
                  className="p-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Framer-Inspired Features Grid Section */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Serviços Personalizados</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Soluções de desenvolvimento adaptadas às necessidades específicas do seu negócio
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-10 w-10 mb-5 text-emerald-600" />,
                title: "Desenvolvimento Web",
                description: "Criação de sites e aplicações web com foco em experiência do usuário e performance."
              },
              {
                icon: <PlayCircle className="h-10 w-10 mb-5 text-emerald-600" />,
                title: "Aplicações Interativas",
                description: "Desenvolvimento de aplicações dinâmicas e responsivas utilizando tecnologias modernas."
              },
              {
                icon: <CreditCard className="h-10 w-10 mb-5 text-emerald-600" />,
                title: "E-commerce",
                description: "Implementação de lojas virtuais com integração de métodos de pagamento e gestão de produtos."
              },
            ].map((service, index) => (
              <ScrollAnimator key={index} delay={index * 100}>
                <div className="flex flex-col h-full p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-emerald-200 dark:hover:border-emerald-800/40 transition-all">
                  {service.icon}
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5">{service.description}</p>
                  <div className="mt-auto">
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      Saiba mais
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Infrastructure Section (Framer-inspired) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            <ScrollAnimator className="w-full md:w-1/2">
              <div className="aspect-video bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src="https://placehold.co/800x450/png" 
                  alt="Infrastructure diagram"
                  className="w-full h-full object-cover" 
                />
              </div>
            </ScrollAnimator>

            <ScrollAnimator className="w-full md:w-1/2" delay={200}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Arquitetura Escalável</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Desenvolvemos soluções robustas que crescem junto com o seu negócio, com foco em performance e segurança.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    "Infraestrutura Cloud-native",
                    "Segurança em todas as camadas",
                    "Otimização de performance",
                    "Backups e recuperação de dados"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Conheça nossa metodologia
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Contact Section (Framer-inspired) */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollAnimator>
              <div className="space-y-8">
                <div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">Vamos trabalhar juntos</p>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Entre em contato</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Estou disponível para novos projetos, consultoria ou simplesmente para trocar ideias sobre tecnologia.
                  </p>
                </div>
                
                <div className="space-y-5">
                  {[
                    { 
                      icon: <Mail className="h-5 w-5" />, 
                      title: "Email", 
                      value: "contato@exemplo.com", 
                      link: "mailto:contato@exemplo.com" 
                    },
                    { 
                      icon: <Linkedin className="h-5 w-5" />, 
                      title: "LinkedIn", 
                      value: "linkedin.com/in/miltonivan", 
                      link: "https://linkedin.com" 
                    },
                    { 
                      icon: <Github className="h-5 w-5" />, 
                      title: "Github", 
                      value: "github.com/miltonivan", 
                      link: "https://github.com" 
                    },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.title}</p>
                        <a 
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Agendar uma reunião
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ScrollAnimator>

            <ScrollAnimator delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <img 
                    src="https://placehold.co/600x800/png" 
                    alt="Office photo 1"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <img 
                      src="https://placehold.co/400x300/png" 
                      alt="Office photo 2"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <img 
                      src="https://placehold.co/400x300/png" 
                      alt="Office photo 3"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section (Framer-inspired) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Tecnologias & Ferramentas</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Utilizando o melhor stack tecnológico para entregar soluções modernas e eficientes
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ScrollAnimator key={index} delay={index * 50}>
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-emerald-200 dark:hover:border-emerald-800/40 transition-all text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <img 
                      src={`https://placehold.co/64x64/png?text=Tech${index+1}`}
                      alt={`Technology ${index+1}`}
                      className="max-w-full max-h-full" 
                    />
                  </div>
                  <p className="font-medium">Technology {index+1}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="container px-6 md:px-6 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <ScrollAnimator>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-gray-400 dark:bg-gray-600"></span>
                Projetos Destacados
              </h2>
            </ScrollAnimator>
            
            <ScrollAnimator delay={100}>
              <div className="flex gap-4">
                <Link 
                  to="/projects"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  Ver todos
                </Link>
              </div>
            </ScrollAnimator>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
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
          </div>
        </div>
      </section>
      
      {/* Need a Document Section */}
      <section className="py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-6 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            <ScrollAnimator className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Precisa de um documento impresso?</h2>
              <div className="mt-4">
                <ActionButton 
                  onClick={handleDownload} 
                  isPending={isDownloading}
                  variant="outline"
                  className="flex items-center gap-2 group hover:border-gray-400 dark:hover:border-gray-600 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Download className="h-4 w-4 group-hover:animate-bounce" />
                  Baixe meu currículo
                </ActionButton>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator className="w-full md:w-1/2" delay={200}>
              <div className="relative mx-auto md:mr-0 md:ml-auto">
                <img 
                  src="https://placehold.co/400x300/png" 
                  alt="Document illustration"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg relative z-10" 
                />
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Tiles in the background of the experience section */}
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles 
              rows={40} 
              cols={10} 
              tileSize="sm"
              className="h-full"
            />
            <div className="tiles-overlay"></div>
          </div>
        </div>
        
        <div className="container px-6 md:px-6 relative z-10">
          <ScrollAnimator>
            <div className="mb-12 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 relative bounce-animation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                  <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Experiência</h2>
            </div>
          </ScrollAnimator>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ScrollAnimator key={experience.id} delay={index * 150}>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300 dark:before:bg-gray-700">
                  <div className="absolute left-0 top-1 w-px h-full">
                    <div className="absolute left-0 top-1 w-2 h-2 -ml-1 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{experience.role} <span className="text-gray-500 dark:text-gray-400">@ {experience.company}</span></h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">{experience.period}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{experience.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-6 md:px-6 relative z-10">
          <ScrollAnimator>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-6 h-0.5 bg-gray-400 dark:bg-gray-600"></span>
              O que dizem sobre mim
            </h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimator key={testimonial.id} delay={index * 150} className="h-full">
                <div className="h-full flex flex-col p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all relative">
                  <div className="mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14.1333 4.8 12.6 5.73333 11.1333C6.73333 9.66666 8.06667 8.46666 9.73333 7.53333L12.2667 10.0667C12 10.2 11.6667 10.4 11.2667 10.6667C10.8667 10.9333 10.5333 11.2 10.2667 11.4667C10 11.7333 9.8 12 9.66667 12.2667C10.0667 12.1333 10.5333 12.0667 11.0667 12.0667C12.5333 12.0667 13.7333 12.6 14.6667 13.6667C15.6 14.6667 16.0667 15.9333 16.0667 17.4667C16.0667 18.9333 15.5333 20.1333 14.4667 21.0667C13.4 21.9333 12.1333 22.4 10.6667 22.4C10.2667 22.4 9.8 22.3333 9.33333 22.2667V21.3333ZM21.3333 21.3333C19.8667 21.3333 18.6667 20.8 17.7333 19.7333C16.8 18.6667 16.3333 17.3333 16.3333 15.7333C16.3333 14.1333 16.8 12.6 17.7333 11.1333C18.7333 9.66666 20.0667 8.46666 21.7333 7.53333L24.2667 10.0667C24 10.2 23.6667 10.4 23.2667 10.6667C22.8667 10.9333 22.5333 11.2 22.2667 11.4667C22 11.7333 21.8 12 21.6667 12.2667C22.0667 12.1333 22.5333 12.0667 23.0667 12.0667C24.5333 12.0667 25.7333 12.6 26.6667 13.6667C27.6 14.6667 28.0667 15.9333 28.0667 17.4667C28.0667 18.9333 27.5333 20.1333 26.4667 21.0667C25.4 21.9333 24.1333 22.4 22.6667 22.4C22.2667 22.4 21.8 22.3333 21.3333 22.2667V21.3333Z" fill="currentColor" fillOpacity="0.2"/>
                    </svg>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">{testimonial.quote}</p>
                  
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 relative" 
                    />
                    
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section (Framer-inspired) */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Planos & Investimentos</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Escolha o plano que melhor se adapta às necessidades do seu projeto
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Básico",
                price: "R$ 2.500",
                description: "Ideal para pequenos negócios que estão começando sua presença online.",
                features: [
                  "Site responsivo",
                  "Até 5 páginas",
                  "Formulário de contato",
                  "SEO básico",
                  "Suporte por 30 dias"
                ]
              },
              {
                name: "Profissional",
                price: "R$ 5.000",
                description: "Para empresas que precisam de uma solução mais robusta e personalizada.",
                features: [
                  "Tudo do plano Básico",
                  "Até 12 páginas",
                  "Design personalizado",
                  "Blog integrado",
                  "Painel administrativo",
                  "Suporte por 90 dias"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Sob consulta",
                description: "Soluções totalmente personalizadas para grandes empresas.",
                features: [
                  "Tudo do plano Profissional",
                  "Páginas ilimitadas",
                  "Integrações personalizadas",
                  "Desenvolvimento sob medida",
                  "Consultoria estratégica",
                  "Suporte prioritário"
                ]
              }
            ].map((plan, index) => (
              <ScrollAnimator key={index} delay={index * 100}>
                <div className={cn(
                  "flex flex-col h-full p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all",
                  plan.highlighted ? "ring-1 ring-emerald-500 dark:ring-emerald-400" : ""
                )}>
                  {plan.highlighted && (
                    <div className="py-1 px-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-full w-fit mb-4">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.name !== "Enterprise" && <span className="text-gray-500 dark:text-gray-400"> / projeto</span>}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mt-0.5 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      className={cn(
                        "w-full", 
                        plan.highlighted 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      )}
                    >
                      {plan.name === "Enterprise" ? "Solicitar orçamento" : "Contratar agora"}
                    </Button>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Framer-inspired) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Perguntas Frequentes</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Tire suas dúvidas sobre o processo de desenvolvimento
              </p>
            </div>
          </ScrollAnimator>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Qual é o prazo médio para desenvolvimento de um site?",
                answer: "O prazo varia de acordo com a complexidade do projeto. Um site institucional simples pode levar de 2 a 4 semanas, enquanto projetos mais complexos podem levar de 2 a 3 meses."
              },
              {
                question: "Como funciona o processo de desenvolvimento?",
                answer: "O processo começa com uma reunião de briefing para entender suas necessidades. Em seguida, desenvolvemos wireframes e protótipos para aprovação. Após a aprovação do design, iniciamos a implementação, seguida por testes e ajustes finais antes do lançamento."
              },
              {
                question: "Vocês oferecem serviços de manutenção após o lançamento?",
                answer: "Sim, oferecemos pacotes de manutenção mensal que incluem atualizações de segurança, pequenas modificações de conteúdo e suporte técnico. Os detalhes podem ser discutidos após a conclusão do projeto."
              },
              {
                question: "O site será responsivo para dispositivos móveis?",
                answer: "Sim, todos os nossos projetos são desenvolvidos com design responsivo, garantindo uma experiência otimizada em desktops, tablets e smartphones."
              },
              {
                question: "Quais tecnologias vocês utilizam?",
                answer: "Utilizamos as tecnologias mais modernas e eficientes do mercado, incluindo React, Next.js, Tailwind CSS para o frontend, e Node.js, Python ou PHP para o backend, dependendo das necessidades específicas do projeto."
              }
            ].map((faq, index) => (
              <ScrollAnimator key={index} delay={index * 100}>
                <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Tiles in the background of the contact section */}
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles 
              rows={30} 
              cols={15} 
              tileSize="lg"
              className="h-full"
            />
            <div className="tiles-overlay"></div>
          </div>
        </div>
        
        <div className="container px-6 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Vamos conversar sobre seu projeto?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Envie um email ou me encontre nas redes sociais
              </p>
            </ScrollAnimator>
            
            <ScrollAnimator delay={150}>
              <div className="flex justify-center gap-6 mb-10">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="mailto:example@example.com" 
                  className="p-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </ScrollAnimator>
            
            <ScrollAnimator delay={300}>
              <button 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-700 text-white font-medium transition-colors relative overflow-hidden group glow-button-animation"
                onClick={() => alert('O formulário de contato será implementado em breve!')}
              >
                <span className="relative z-10">Enviar email</span>
              </button>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
