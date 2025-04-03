
import React, { useEffect, useRef } from 'react';

interface ProjectParallaxProps {
  image: string;
  title: string;
  description: string;
}

export function ProjectParallax({ image, title, description }: ProjectParallaxProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrollTop = window.scrollY;
      const element = parallaxRef.current;
      const elementPos = element.getBoundingClientRect().top + scrollTop;
      const elementVisible = window.innerHeight;
      
      // Quando o elemento estiver visível na tela
      if (elementPos < scrollTop + elementVisible) {
        const distance = scrollTop - elementPos;
        const speed = 0.4; // Velocidade do efeito parallax
        
        const yPos = -(distance * speed);
        element.style.backgroundPositionY = `${yPos}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative min-h-[50vh] group">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-800/60 dark:from-navy-950/90 dark:to-navy-900/70"></div>
      
      <div className="relative container min-h-[50vh] flex flex-col justify-center py-16">
        <div className="max-w-2xl bg-white/10 dark:bg-navy-950/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 dark:border-navy-800/50 transition-all duration-300 transform group-hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <div className="w-16 h-1 bg-sky-400 mb-6"></div>
          <p className="text-gray-100 dark:text-gray-200 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
