import { useEffect, useRef } from "react";

/**
 * Hook para criar um efeito parallax suave em um elemento de fundo
 * @param speed Velocidade do efeito parallax (1 = velocidade normal, 0.5 = metade da velocidade, etc.)
 * @returns Ref a ser aplicado ao elemento que receberá o efeito
 */
export const useParallax = (speed: number = 0.3) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDiff = scrollTop - lastScrollTop;
      const parallaxOffset = scrollDiff * speed;

      if (element) {
        // Obter a transformação atual se existir
        const currentTransform = element.style.transform || "";
        const translateYMatch = currentTransform.match(/translateY\(([^)]+)\)/);

        let currentTranslateY = 0;
        if (translateYMatch && translateYMatch[1]) {
          currentTranslateY = parseFloat(translateYMatch[1]);
          // Converter para número se estiver em px ou outro formato
          if (translateYMatch[1].includes("px")) {
            currentTranslateY = parseFloat(translateYMatch[1]);
          } else if (translateYMatch[1].includes("%")) {
            currentTranslateY =
              (parseFloat(translateYMatch[1]) * element.offsetHeight) / 100;
          }
        }

        // Atualizar o translateY
        const newTranslateY = currentTranslateY + parallaxOffset;

        // Aplicar a nova transformação
        element.style.transform =
          currentTransform.replace(/translateY\([^)]+\)/, "") +
          `translateY(${newTranslateY}px)`;

        // Se não havia transform antes, adicionamos um novo
        if (!currentTransform.includes("translateY")) {
          element.style.transform = `${currentTransform} translateY(${newTranslateY}px)`;
        }
      }

      lastScrollTop = scrollTop;
    };

    const onScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(handleScroll);
    };

    // Inicializar a posição
    element.style.willChange = "transform";

    // Adicionar event listener
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed]);

  return elementRef;
};
