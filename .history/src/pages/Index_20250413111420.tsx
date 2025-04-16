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
} from "lucide-react";
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
            <Tiles rows={30} cols={12} tileSize="md" className="h-full" />
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
                    "Criando valor para o crescimento dos negócios através do código.",
                    "Soluções digitais para o mundo real.",
                    "Transformando ideias em código.",
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
                <div className="flex flex-col h-full p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-emerald-200 dark:hover:border-emerald-800/40 transition-all">
                  {service.icon}
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5">
                    {service.description}
                  </p>
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
            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-800"
            >
              View all experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
