
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Calendar, Github, LinkedIn, Mail, Twitter } from "lucide-react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { testimonials } from "@/data/testimonials";

const Index = () => {
  // Animation for hero section
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

  useEffect(() => {
    // Initialize scroll animation observer
    const setupScrollAnimation = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.observe(element);
      });
    };

    setupScrollAnimation();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
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
        className="pt-32 pb-16 md:pt-40 md:pb-24"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shrink-0"
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
                className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                variants={heroItemVariants}
              >
                Milton Ivan • Desenvolvedor Javascript Profissional
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance"
                variants={heroItemVariants}
              >
                Criando valor para o crescimento dos negócios através do código.
              </motion.h1>
              
              <motion.div 
                className="flex gap-4 mt-6"
                variants={heroItemVariants}
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedIn className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:example@example.com" 
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 md:px-6">
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
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
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
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            <ScrollAnimator className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Precisa de um documento impresso?</h2>
              <a 
                href="/resume.pdf" 
                download
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors gap-2"
              >
                <Calendar className="h-4 w-4" />
                Baixe meu currículo
              </a>
            </ScrollAnimator>
            
            <ScrollAnimator className="w-full md:w-1/2" delay={200}>
              <img 
                src="https://placehold.co/400x300/png" 
                alt="Document illustration"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg" 
              />
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 md:px-6">
          <ScrollAnimator>
            <div className="mb-12 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <section id="testimonials" className="py-16">
        <div className="container px-4 md:px-6">
          <ScrollAnimator>
            <h2 className="text-2xl font-bold mb-12 flex items-center gap-2">
              <span className="inline-block w-6 h-0.5 bg-gray-400 dark:bg-gray-600"></span>
              O que dizem sobre mim
            </h2>
          </ScrollAnimator>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimator key={testimonial.id} delay={index * 150} className="h-full">
                <div className="h-full flex flex-col p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all">
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
                      className="w-12 h-12 rounded-full mr-4" 
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
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos conversar sobre seu projeto?</h2>
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
                  <LinkedIn className="h-6 w-6" />
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
              <a 
                href="mailto:example@example.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                Enviar email
              </a>
            </ScrollAnimator>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
