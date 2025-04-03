
import { HeroSection } from "@/components/ui/hero-section"

export function HeroSectionDemo() {
  return (
    <HeroSection
      title="Milton Ivan • Desenvolvedor Javascript Profissional"
      subtitle={{
        regular: "Criando valor para o crescimento dos ",
        gradient: "negócios através do código",
      }}
      description="Transformando ideias em soluções digitais para o mundo real, com foco em experiências de usuário de alta qualidade."
      ctaText="Conheça meu trabalho"
      ctaHref="#projects"
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
}
