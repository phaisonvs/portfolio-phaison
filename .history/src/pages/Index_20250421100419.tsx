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
import { FeaturedProjectsCarousel } from "@/components/FeaturedProjectsCarousel";

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
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1150px] px-4 sm:px-6 md:px-8">
          {/* Hero Section */}
          <section className="pt-16 md:pt-20 lg:pt-24 mb-12 md:mb-16 lg:mb-20">
            <HeroSection />
          </section>

          {/* About Section */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <AboutSection />
          </section>

          {/* Featured Projects Section */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <FeaturedProjectsCarousel projects={featuredProjects} />
          </section>

          {/* Skills Section */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <SkillsSection />
          </section>

          {/* Contact Section */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <ContactSection />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
