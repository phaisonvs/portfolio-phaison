import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Inicializando o Lenis para scroll suave
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function similar ao do lemni.com
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Capturando elementos com atributos de velocidade
    const scrollElements = document.querySelectorAll("[data-scroll-speed]");
    let scrollY = 0;

    // Handler para animar elementos com paralaxe
    const handleParallax = () => {
      scrollElements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.scrollSpeed || "0");

        if (speed) {
          const yPos = scrollY * speed;
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    };

    // Subscriber para o evento de scroll do Lenis
    lenisRef.current.on("scroll", (e: any) => {
      scrollY = e.scroll || window.scrollY;
      handleParallax();
    });

    // Função para atualizar o scroll a cada frame
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    // Inicializa a animação
    requestAnimationFrame(raf);

    // Atualizando em caso de redimensionamento
    window.addEventListener("resize", handleParallax);

    // Cleanup na desmontagem do componente
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener("resize", handleParallax);
    };
  }, []);

  return <>{children}</>;
};
