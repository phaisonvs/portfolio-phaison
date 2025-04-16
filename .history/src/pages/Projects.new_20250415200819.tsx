import { useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectList } from "@/features/projects/ProjectList";
import { ScrollAnimator } from "@/components/ScrollAnimator";

export default function Projects() {
  // Restaura a posição da rolagem ao topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollAnimator>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meus <span className="text-primary">Projetos</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore meus projetos recentes. Cada projeto é uma oportunidade de
            aprendizado e uma chance de resolver problemas interessantes usando
            tecnologias modernas.
          </p>
        </motion.div>

        <ProjectList />
      </div>
    </ScrollAnimator>
  );
}
