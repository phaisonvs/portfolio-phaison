import React, { useEffect, useRef, useState } from "react";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number; // em milissegundos
  threshold?: number; // porcentagem de visibilidade (0 a 1)
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  delay = 0,
  threshold = 0.2,
  direction = "up",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Define a direção da animação
  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)";
      case "down":
        return "translateY(-40px)";
      case "left":
        return "translateX(40px)";
      case "right":
        return "translateX(-40px)";
      default:
        return "translateY(40px)";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o elemento estiver visível no viewport
        if (entry.isIntersecting) {
          // Adicione um atraso se especificado
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Desconecte o observer depois que o elemento for visível
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};
