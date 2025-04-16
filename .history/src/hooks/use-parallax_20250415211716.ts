import { useEffect, useRef } from "react";

/**
 * Hook para criar um efeito parallax suave em um elemento de fundo
 * @param speed Velocidade do efeito parallax (1 = velocidade normal, 0.5 = metade da velocidade, etc.)
 * @param maxOffset Deslocamento máximo permitido em pixels (para limitar o movimento)
 * @returns Ref a ser aplicado ao elemento que receberá o efeito
 */
export const useParallax = (speed: number = 0.3, maxOffset: number = 100) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    let totalOffset = 0; // Para controlar o offset total acumulado

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDiff = scrollTop - lastScrollTop;
      const parallaxOffset = scrollDiff * speed;

      if (element) {
        // Atualizar o offset total, mas limitar ao máximo definido
        totalOffset += parallaxOffset;
        totalOffset = Math.max(-maxOffset, Math.min(totalOffset, maxOffset));

        // Aplicar a transformação com o offset limitado
        element.style.transform = `translateY(${totalOffset}px)`;
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
    element.style.transform = "translateY(0)";

    // Adicionar event listener
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, maxOffset]);

  return elementRef;
};
