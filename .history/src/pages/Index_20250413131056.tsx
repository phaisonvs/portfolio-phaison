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
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

// Experiências profissionais
const experiences = [
  {
    id: 1,
    role: "Desenvolvedor Front-end Senior",
    company: "TechCorp Solutions",
    period: "Jan 2022 - Presente",
    description:
      "Liderando o desenvolvimento de interfaces complexas para aplicações SaaS, focando em acessibilidade e performance. Implementação de arquitetura escalável e mentoria de desenvolvedores júnior.",
    technologies: ["React", "TypeScript", "Next.js", "TailwindCSS", "Redux"],
  },
  {
    id: 2,
    role: "Desenvolvedor Full Stack",
    company: "Inovação Digital",
    period: "Mar 2019 - Dez 2021",
    description:
      "Desenvolvimento de aplicações web responsivas com foco em experiência do usuário. Implementação de APIs RESTful e integração com serviços de terceiros.",
    technologies: ["Vue.js", "Node.js", "Express", "MongoDB", "Docker"],
  },
  {
    id: 3,
    role: "Desenvolvedor Web",
    company: "Startup Criativa",
    period: "Jun 2017 - Fev 2019",
    description:
      "Criação de websites e landing pages otimizadas para SEO, com ênfase em design responsivo e velocidade de carregamento.",
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP"],
  },
];

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

  // Use the smooth scroll hook
  useSmoothScroll();

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
    <div className="min-h-screen flex flex-col lemni-theme">
      <Navbar />

      {/* Hero Section */}
      <section
        className="lemni-section lemni-hero relative overflow-hidden"
        data-lenis-scroll-snap-align="start"
      >
        <div className="lemni-container">
          <ScrollFadeIn direction="up" delay={300} className="max-w-3xl">
            <h1 className="mb-6">
              Desenvolvedor Javascript Profissional criando soluções usando os
              porquês
            </h1>
            <p className="mb-8 text-xl max-w-2xl">
              Milton Ivan • Transformando problemas complexos em interfaces
              elegantes e intuitivas com foco em performance e usabilidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="lemni-button lemni-button-primary"
                data-lenis-scroll-snap-align
              >
                Ver projetos
              </a>
              <button onClick={handleDownload} className="lemni-button">
                {isDownloading ? "Baixando..." : "Baixar CV"}
              </button>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Serviços Personalizados Section */}
      <section className="lemni-section py-24" id="services">
        <div className="lemni-container">
          <ScrollFadeIn direction="up" className="text-center mb-16">
            <h2 className="mb-4">Serviços Personalizados</h2>
            <p className="max-w-2xl mx-auto">
              Soluções de desenvolvimento adaptadas às necessidades específicas
              do seu negócio
            </p>
          </ScrollFadeIn>

          <div className="lemni-grid lemni-grid-3 mt-16">
            {[
              {
                icon: <FileText className="h-10 w-10 mb-5 text-accent" />,
                title: "Desenvolvimento Web",
                description:
                  "Criação de sites e aplicações web com foco em experiência do usuário e performance.",
              },
              {
                icon: <PlayCircle className="h-10 w-10 mb-5 text-accent" />,
                title: "Aplicações Interativas",
                description:
                  "Desenvolvimento de aplicações dinâmicas e responsivas utilizando tecnologias modernas.",
              },
              {
                icon: <CreditCard className="h-10 w-10 mb-5 text-accent" />,
                title: "E-commerce",
                description:
                  "Implementação de lojas virtuais com integração de métodos de pagamento e gestão de produtos.",
              },
            ].map((service, index) => (
              <ScrollFadeIn
                key={index}
                delay={index * 150}
                className="lemni-card"
              >
                <div className="text-accent">{service.icon}</div>
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p>{service.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center mt-6 text-accent font-medium hover:underline"
                >
                  Saiba mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ScrollFadeIn>
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
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                  Arquitetura Escalável
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
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

      {/* Experience Section */}
      <section
        id="experience"
        className="lemni-section bg-stone-50 dark:bg-gray-950/80"
      >
        <div className="lemni-container">
          <ScrollFadeIn direction="up" className="mb-20">
            <h2 className="mb-4">Experiência Profissional</h2>
            <p className="max-w-2xl">
              Trajetória de projetos e colaborações com empresas de tecnologia
            </p>
          </ScrollFadeIn>

          <div className="lemni-grid lemni-grid-2 gap-12">
            <div>
              {experiences.map((experience, index) => (
                <ScrollFadeIn
                  key={experience.id}
                  delay={index * 150}
                  className="mb-16 last:mb-0"
                >
                  <div className="mb-2">
                    <h3 className="text-2xl">{experience.role}</h3>
                    <div className="text-accent font-medium mt-1">
                      {experience.company}
                    </div>
                    <div className="text-sm text-text-light mt-1 mb-4">
                      {experience.period}
                    </div>
                  </div>
                  <p className="mb-4">{experience.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-stone-100 dark:bg-gray-800 rounded-full text-stone-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </ScrollFadeIn>
              ))}
            </div>

            <div className="sticky top-10 h-fit">
              <ScrollFadeIn direction="right" delay={100}>
                <div className="relative w-full h-auto aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=2940&auto=format&fit=crop"
                    alt="Work Experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 text-sm text-text-light">
                  <p className="mb-2">
                    <strong className="text-text font-medium">+5 anos</strong>{" "}
                    de experiência em desenvolvimento
                  </p>
                  <p>
                    <strong className="text-text font-medium">
                      +20 projetos
                    </strong>{" "}
                    entregues com satisfação
                  </p>
                </div>
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles rows={30} cols={15} tileSize="lg" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 md:px-6 relative z-10">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
                O que dizem sobre mim
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
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
                <div className="h-full flex flex-col p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all relative">
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
                        className="text-emerald-200 dark:text-emerald-900/50"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-8 flex-grow">
                    {testimonial.quote}
                  </p>

                  <div className="flex items-center mt-auto">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-emerald-100 dark:border-emerald-900/30"
                    />

                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
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
      <section
        id="contact"
        className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden"
      >
        {/* Tiles in the background of the contact section */}
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles rows={30} cols={15} tileSize="lg" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
                Vamos conversar sobre seu projeto?
              </h2>
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
                onClick={() =>
                  alert("O formulário de contato será implementado em breve!")
                }
              >
                <span className="relative z-10">Enviar email</span>
              </button>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Framer-inspired Contact Section (from Framer.com/contact) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Contact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get help from support, sales, or experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Email support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our friendly team is here to help with any questions.
                </p>
              </div>
              <a
                href="mailto:support@example.com"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
              >
                support@example.com
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Sales</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Talk to our sales team about larger organizations.
                </p>
              </div>
              <a
                href="mailto:sales@example.com"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300"
              >
                sales@example.com
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find guidance and answers in our documentation.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300"
              >
                View documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Framer-inspired "Find expert help" Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Find expert help
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Agencies and freelancers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Web Studio",
                type: "Agency",
                expertise: "Web Development",
                image: "https://placehold.co/80x80/png",
              },
              {
                name: "Design Masters",
                type: "Agency",
                expertise: "UI/UX Design",
                image: "https://placehold.co/80x80/png",
              },
              {
                name: "John Designer",
                type: "Freelancer",
                expertise: "Brand Identity",
                image: "https://placehold.co/80x80/png",
              },
              {
                name: "Dev Experts",
                type: "Agency",
                expertise: "Full Stack",
                image: "https://placehold.co/80x80/png",
              },
            ].map((expert, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 flex items-start gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium mb-1">{expert.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {expert.type}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {expert.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
            >
              Ver todos os experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Improved FAQ Section (Framer-styled) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tire suas dúvidas sobre o processo de desenvolvimento
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question:
                  "Qual é o prazo médio para desenvolvimento de um site?",
                answer:
                  "O prazo varia de acordo com a complexidade do projeto. Um site institucional simples pode levar de 2 a 4 semanas, enquanto projetos mais complexos podem levar de 2 a 3 meses.",
              },
              {
                question: "Como funciona o processo de desenvolvimento?",
                answer:
                  "O processo começa com uma reunião de briefing para entender suas necessidades. Em seguida, desenvolvemos wireframes e protótipos para aprovação. Após a aprovação do design, iniciamos a implementação, seguida por testes e ajustes finais antes do lançamento.",
              },
              {
                question:
                  "Vocês oferecem serviços de manutenção após o lançamento?",
                answer:
                  "Sim, oferecemos pacotes de manutenção mensal que incluem atualizações de segurança, pequenas modificações de conteúdo e suporte técnico. Os detalhes podem ser discutidos após a conclusão do projeto.",
              },
              {
                question: "O site será responsivo para dispositivos móveis?",
                answer:
                  "Sim, todos os nossos projetos são desenvolvidos com design responsivo, garantindo uma experiência otimizada em desktops, tablets e smartphones.",
              },
              {
                question: "Quais tecnologias vocês utilizam?",
                answer:
                  "Utilizamos as tecnologias mais modernas e eficientes do mercado, incluindo React, Next.js, Tailwind CSS para o frontend, e Node.js, Python ou PHP para o backend, dependendo das necessidades específicas do projeto.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-5">
                <details className="group faq-accordion">
                  <summary className="flex items-center justify-between p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm cursor-pointer hover:shadow-md transition-all">
                    <h3 className="text-xl font-medium">{faq.question}</h3>
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 rounded-b-xl bg-white dark:bg-gray-800">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Grid Section (Mimic Design-inspired) */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Premium Websites Built For Conversions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Elegância, funcionalidade e resultados em cada pixel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Optimized for Performance",
                description:
                  "Faster loading times, better user experience, and higher conversion rates.",
                image: "https://placehold.co/600x400/png",
              },
              {
                title: "Mobile-First Approach",
                description:
                  "Reach your audience on any device with responsive, adaptive designs.",
                image: "https://placehold.co/600x400/png",
              },
              {
                title: "SEO Best Practices",
                description:
                  "Built with search engines in mind to increase visibility and traffic.",
                image: "https://placehold.co/600x400/png",
              },
              {
                title: "Conversion Focused",
                description:
                  "Strategic layouts and CTAs designed to convert visitors into customers.",
                image: "https://placehold.co/600x400/png",
              },
              {
                title: "Brand Consistency",
                description:
                  "Cohesive visual identity across all touchpoints for stronger brand recognition.",
                image: "https://placehold.co/600x400/png",
              },
              {
                title: "Scalable Architecture",
                description:
                  "Flexible foundation that grows with your business needs.",
                image: "https://placehold.co/600x400/png",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section 1 */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Todos os Projetos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Conheça nossa coleção de trabalhos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-xl group"
              >
                <img
                  src={
                    project.image ||
                    "https://placehold.co/800x600/png?text=Projeto"
                  }
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-medium text-lg">
                      {project.title}
                    </h3>
                    <Link
                      to={`/project/${project.id}`}
                      className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Ver Detalhes
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split-Screen Image/Text Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-7xl">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 mb-24 last:mb-0`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-medium">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {project.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.fullDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
                  >
                    Ver Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masonry Grid Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Creative Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              An asymmetric display of our diverse work
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              { height: "h-96", order: 1 },
              { height: "h-64", order: 2 },
              { height: "h-80", order: 3 },
              { height: "h-72", order: 4 },
              { height: "h-64", order: 5 },
              { height: "h-96", order: 6 },
              { height: "h-80", order: 7 },
              { height: "h-72", order: 8 },
              { height: "h-64", order: 9 },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.height} w-full rounded-lg overflow-hidden relative group break-inside-avoid mb-4`}
                style={{ order: item.order }}
              >
                <img
                  src={`https://placehold.co/800x600/png?text=Masonry${
                    index + 1
                  }`}
                  alt={`Masonry image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-white font-medium text-lg">
                      Project {index + 1}
                    </h3>
                    <p className="text-gray-200 text-sm">Category • Year</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
