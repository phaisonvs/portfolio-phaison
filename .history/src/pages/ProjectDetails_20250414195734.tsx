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
  PlayCircle,
  Send,
} from "lucide-react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Tiles } from "@/components/ui/tiles";
import { Button } from "@/components/ui/button";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Project Hero Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-full md:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-medium">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
                  >
                    Ver Projeto
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
                {project.gitUrl && (
                  <a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Código Fonte
                    <Github className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Find Expert Help Section */}
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
