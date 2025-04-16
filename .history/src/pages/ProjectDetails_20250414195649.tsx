import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Tiles } from "@/components/ui/tiles";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Aqui serão inseridas as seções movidas da página principal */}

      <Footer />
    </div>
  );
};

export default ProjectDetails;
