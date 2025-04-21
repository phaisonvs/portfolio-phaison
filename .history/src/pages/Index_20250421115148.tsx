import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  PlayCircle,
  FileText,
  CreditCard,
  Scan,
  ChevronRight,
  Send,
  ArrowUpRight,
  Phone,
  Calendar,
} from "lucide-react";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { setupScrollAnimations } from "@/utils/scrollAnimation";
import { Tiles } from "@/components/ui/tiles";
import ActionButton from "@/components/ui/action-button";
import { TypeAnimationEnhanced } from "@/components/ui/TypeAnimationEnhanced";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { experiences } from "../data/experience";
import { ProjectsSwiper } from "@/components/ProjectsSwiper";

// Tipo para o componente de Tiles
interface TilesProps {
  rows: number;
  cols: number;
  tileSize: string;
  className?: string;
}

const Index = () => {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1.1); // Estado para a escala do background

  // Use the smooth scroll hook
  useSmoothScroll();

  // Efeito Parallax com Zoom
  useEffect(() => {
    const backgroundImage = document.querySelector(
      ".global-background-image"
    ) as HTMLElement | null;

    if (!backgroundImage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Ajusta a escala baseada no scroll.
      // Começa em 1.1, aumenta até ~1.25 e depois diminui suavemente
      // O divisor 5000 controla a "velocidade" do zoom
      const newScale = 1.1 + scrollY / 5000;
      // Limita a escala máxima para evitar zoom excessivo
      setScale(Math.min(newScale, 1.25));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true }); // Usa passive: true para melhor performance

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []); // Dependência vazia para rodar apenas na montagem/desmontagem

  const handleDownload = () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);

      // Create a link element
      const link = document.createElement("a");
      link.href = "/resume.pdf"; // The path to your PDF file
      link.download = "resume.pdf";

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

  const featuredProjects = projects
    .filter((project) => project.featured && project.visible)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col page-wrapper relative">
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
            willChange: "transform", // Importante para performance de animação
            transition: "transform 0.3s ease-out", // Ajuste da transição para mais suavidade
            opacity: 0.4,
            filter: "contrast(1.2) brightness(0.65) blur(0px)",
            transform: `scale(${scale})`, // Aplica a escala do estado
            transformOrigin: "center center",
          }}
        ></div>
      </div>
      <Navbar />
      {/* Hero Section - sem background próprio */}
      <motion.section
        className="hero-section pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tiles for background - reduz opacidade */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="tiles-container">
            <Tiles rows={30} cols={12} tileSize="md" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 md:px-6 mx-auto relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-emerald-50/10 dark:border-emerald-900/20 shrink-0 profile-float"
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
                className="text-sm text-emerald-400 dark:text-emerald-400 mb-2"
                variants={heroItemVariants}
              >
                Phaison Vieira - UI/UX Designer
              </motion.p>

              <motion.div
                className="typing-container mb-4"
                variants={heroItemVariants}
              >
                <TypeAnimationEnhanced
                  sequence={["Veja como construí soluções usando porquês."]}
                  wrapper="h1"
                  speed={30}
                  deletionSpeed={30}
                  pauseDuration={Infinity}
                  repeat={1}
                  cursor={true}
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-balance leading-tight break-words text-white"
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
                  className="p-2 rounded-full border border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:example@example.com"
                  className="p-2 rounded-full border border-emerald-800/30 hover:bg-emerald-900/20 text-emerald-400 transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Nova Seção Projetos em Destaque - REMOVIDO o antigo carrossel */}
      {/* <section className="py-12 md:py-20 overflow-hidden">
        <div
          className="container mx-auto px-4 sm:px-6"
          style={{ maxWidth: "1150px" }} // Mantém o maxWidth anterior ou ajusta conforme necessário
        >
          <ResponsiveSwiper items={featuredProjects} />
        </div>
      </section> */}

      {/* Framer-Inspired Features Grid Section - sem background próprio */}
      <section className="py-24 relative">
        <div className="container px-6 mx-auto max-w-6xl">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
                Serviços Personalizados
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Soluções de desenvolvimento adaptadas às necessidades
                específicas do seu negócio
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-10 w-10 mb-5 text-emerald-600" />,
                title: "Desenvolvimento Web",
                description:
                  "Criação de sites e aplicações web com foco em experiência do usuário e performance.",
              },
              {
                icon: (
                  <PlayCircle className="h-10 w-10 mb-5 text-emerald-600" />
                ),
                title: "Aplicações Interativas",
                description:
                  "Desenvolvimento de aplicações dinâmicas e responsivas utilizando tecnologias modernas.",
              },
              {
                icon: (
                  <CreditCard className="h-10 w-10 mb-5 text-emerald-600" />
                ),
                title: "E-commerce",
                description:
                  "Implementação de lojas virtuais com integração de métodos de pagamento e gestão de produtos.",
              },
            ].map((service, index) => (
              <ScrollAnimator key={index} delay={index * 100}>
                <div className="flex flex-col h-full p-8 rounded-xl border border-gray-100/10 dark:border-gray-800/30 bg-gray-900/40 backdrop-blur-sm hover:border-emerald-800/40 dark:hover:border-emerald-800/40 transition-all">
                  {service.icon}
                  <h3 className="text-xl font-medium mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-5">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-emerald-400 dark:text-emerald-400 font-medium hover:text-emerald-300 dark:hover:text-emerald-300 transition-colors"
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
      {/* Enterprise Infrastructure Section */}
      <section className="py-24 relative">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            <ScrollAnimator className="w-full md:w-1/2">
              <div className="aspect-video bg-gray-900/40 backdrop-blur-sm dark:bg-gray-800/40 rounded-2xl shadow-lg overflow-hidden border border-gray-100/10 dark:border-gray-700/30">
                <img
                  src="https://placehold.co/800x450/png"
                  alt="Infrastructure diagram"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </ScrollAnimator>

            <ScrollAnimator className="w-full md:w-1/2" delay={200}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                  Arquitetura Escalável
                </h2>
                <p className="text-gray-300 dark:text-gray-300 text-lg">
                  Desenvolvemos soluções robustas que crescem junto com o seu
                  negócio, com foco em performance e segurança.
                </p>

                <div className="space-y-4 pt-4">
                  {[
                    "Infraestrutura Cloud-native",
                    "Segurança em todas as camadas",
                    "Otimização de performance",
                    "Backups e recuperação de dados",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 shrink-0" />
                      <span className="text-gray-200">{feature}</span>
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
      {/* Experience Section */}
      <section id="experience" className="py-16 relative overflow-hidden">
        {/* Tiles in the background of the experience section */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="tiles-container">
            <Tiles rows={40} cols={10} tileSize="sm" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 mx-auto relative z-10 max-w-6xl">
          <ScrollAnimator>
            <div className="mb-12 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm relative bounce-animation border border-gray-700/30">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 text-emerald-400"
                >
                  <path
                    d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Experiência</h2>
            </div>
          </ScrollAnimator>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ScrollAnimator key={experience.id} delay={index * 150}>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-600/50 dark:before:bg-gray-600/50">
                  <div className="absolute left-0 top-1 w-px h-full">
                    <div className="absolute left-0 top-1 w-2 h-2 -ml-1 rounded-full bg-emerald-500/70 dark:bg-emerald-500/70"></div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {experience.role}{" "}
                      <span className="text-emerald-400 dark:text-emerald-400">
                        @ {experience.company}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-400 mt-1 mb-3">
                      {experience.period}
                    </p>
                    <p className="text-gray-300 dark:text-gray-300 mb-4">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 dark:text-gray-300 border border-gray-700/30"
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
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="tiles-container">
            <Tiles rows={30} cols={15} tileSize="lg" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 mx-auto relative z-10 max-w-6xl">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight text-white">
                O que dizem sobre mim
              </h2>
              <p className="text-gray-300 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                Feedback de clientes e parceiros de projetos
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimator
                key={testimonial.id}
                delay={index * 150}
                className="h-full"
              >
                <div className="h-full flex flex-col p-8 rounded-xl border border-gray-700/30 dark:border-gray-700/30 bg-gray-900/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all relative">
                  <div className="mb-6">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 32C11.8 32 10 31.2 8.6 29.6C7.2 28 6.5 26 6.5 23.6C6.5 21.2 7.2 18.9 8.6 16.7C10.1 14.5 12.1 12.7 14.6 11.3L18.4 15.1C18 15.3 17.5 15.6 16.9 16C16.3 16.4 15.8 16.8 15.4 17.2C15 17.6 14.7 18 14.5 18.4C15.1 18.2 15.8 18.1 16.6 18.1C18.8 18.1 20.6 18.9 22 20.5C23.4 22 24.1 24 24.1 26.5C24.1 28.9 23.3 30.9 21.7 32.5C20.1 33.9 18.1 34.6 15.8 34.6C15.2 34.6 14.6 34.5 14 34.4V32ZM32 32C29.8 32 28 31.2 26.6 29.6C25.2 28 24.5 26 24.5 23.6C24.5 21.2 25.2 18.9 26.6 16.7C28.1 14.5 30.1 12.7 32.6 11.3L36.4 15.1C36 15.3 35.5 15.6 34.9 16C34.3 16.4 33.8 16.8 33.4 17.2C33 17.6 32.7 18 32.5 18.4C33.1 18.2 33.8 18.1 34.6 18.1C36.8 18.1 38.6 18.9 40 20.5C41.4 22 42.1 24 42.1 26.5C42.1 28.9 41.3 30.9 39.7 32.5C38.1 33.9 36.1 34.6 33.8 34.6C33.2 34.6 32.6 34.5 32 34.4V32Z"
                        fill="currentColor"
                        className="text-emerald-700/20 dark:text-emerald-700/20"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-300 dark:text-gray-300 text-lg italic mb-8 flex-grow">
                    {testimonial.quote}
                  </p>

                  <div className="flex items-center mt-auto">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-emerald-700/30 dark:border-emerald-700/30"
                    />

                    <div>
                      <h4 className="font-medium text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-emerald-400 dark:text-emerald-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="tiles-container">
            <Tiles rows={30} cols={15} tileSize="lg" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 mx-auto relative z-10 max-w-6xl">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight text-white">
                Vamos trabalhar juntos?
              </h2>
              <p className="text-gray-300 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                Entre em contato para discutir seu projeto ou tirar dúvidas
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700/30">
              <div className="mb-6">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Email</h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Envie suas dúvidas ou solicite um orçamento
                </p>
              </div>
              <a
                href="mailto:contato@example.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors w-full"
              >
                Enviar Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700/30">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">
                  Telefone
                </h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Fale diretamente com nosso time
                </p>
              </div>
              <a
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors w-full"
              >
                Ligar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700/30">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">
                  Agendamento
                </h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Marque uma reunião para discutir seu projeto
                </p>
              </div>
              <Link
                to="/agendamento"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors w-full"
              >
                Agendar Reunião
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
