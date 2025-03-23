
import React, { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Configurar observer apenas se o elemento não estiver já visível (para performance)
    if (isVisible && once) return;
    
    // Aplicar delay como um estilo inline para performance
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Adicionar classe de animação quando visível
            element.classList.add('animate');
            
            // Se once=true, parar de observar após animação
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // Remover classe se elemento sair da tela (apenas se once=false)
            element.classList.remove('animate');
            setIsVisible(false);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Verificar se o elemento já está visível na viewport (para animações imediatas)
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (rect.top <= windowHeight) {
      setIsVisible(true);
      element.classList.add('animate');
      if (once) return; // Não criar observer se elemento já está visível e once=true
    }

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay, once, isVisible]);

  return (
    <div 
      ref={elementRef} 
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}
