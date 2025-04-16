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
              className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-emerald-50 dark:border-emerald-900/20 shrink-0 profile-float"
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
                  sequence={["Veja como construí soluções usando porquês"]}
                  wrapper="h1"
                  speed={30} // Faster typing speed
                  deletionSpeed={30}
                  pauseDuration={Infinity} // Never switch to another phrase
                  repeat={1} // No repeat needed since we're keeping the text
                  cursor={true}
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-balance leading-tight break-words"
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

      {/* Experience Section */}
      <section
        id="experience"
        className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden"
      >
        {/* Tiles in the background of the experience section */}
        <div className="absolute inset-0 z-0">
          <div className="tiles-container">
            <Tiles rows={40} cols={10} tileSize="sm" className="h-full" />
            <div className="tiles-overlay"></div>
          </div>
        </div>

        <div className="container px-6 md:px-6 relative z-10">
          <ScrollAnimator>
            <div className="mb-12 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 relative bounce-animation">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
                    fill="currentColor"
                  />
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
                    <h3 className="text-lg font-semibold">
                      {experience.role}{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        @ {experience.company}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                      {experience.period}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {experience.description}
                    </p>

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
              Gallery Showcase
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A collection of our finest work
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl group"
              >
                <img
                  src={`https://placehold.co/800x600/png?text=Image${
                    index + 1
                  }`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-medium text-lg">
                      Project Title
                    </h3>
                    <button className="mt-3 px-4 py-2 bg-white text-black rounded-md text-sm font-medium">
                      View Details
                    </button>
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
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 mb-24 last:mb-0`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={`https://placehold.co/1000x800/png?text=Featured${
                    index + 1
                  }`}
                  alt={`Featured project ${index + 1}`}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-medium">
                  Featured Project {index + 1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  dapibus rutrum facilisis. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Etiam porta sem malesuada magna mollis euismod. Vivamus
                  sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  Maecenas faucibus mollis interdum.
                </p>
                <div>
                  <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black">
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
