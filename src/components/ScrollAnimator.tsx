
import React, { useEffect, useRef } from 'react';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export function ScrollAnimator({ 
  children, 
  className = "", 
  threshold = 0.1,
  delay = 0,
  once = true
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Configurar o atributo data-observe-once para controle no IntersectionObserver
    if (once) {
      element.dataset.observeOnce = 'true';
    }
    
    // Aplicar delay como um estilo inline para performance
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adicionar classe de animação quando visível
            element.classList.add('animate');
            
            // Se once=true, parar de observar após animação
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // Remover classe se elemento sair da tela (apenas se once=false)
            element.classList.remove('animate');
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay, once]);

  return (
    <div 
      ref={elementRef} 
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}
