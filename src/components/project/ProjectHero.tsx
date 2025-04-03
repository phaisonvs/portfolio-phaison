
import React, { useEffect, useRef } from 'react';

interface ProjectHeroProps {
  image: string;
  title: string;
}

export function ProjectHero({ image, title }: ProjectHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Aumentando o efeito de parallax para torná-lo mais perceptível
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
      
      // Adicionando efeito de hover nos elementos internos
      const titleElement = heroRef.current.querySelector('h1');
      const accentLine = heroRef.current.querySelector('.accent-line');
      
      if (titleElement) {
        titleElement.style.transform = `translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
      }
      
      if (accentLine) {
        accentLine.style.transform = `translate(${(x - 0.5) * 15}px, ${(y - 0.5) * 5}px) scaleX(${0.8 + y * 0.4})`;
      }
    };
    
    const handleMouseEnter = () => {
      if (!heroRef.current) return;
      
      // Adicionar uma classe quando o mouse entrar
      heroRef.current.classList.add('hero-hovered');
    };
    
    const handleMouseLeave = () => {
      if (!heroRef.current) return;
      
      // Resetar todas as transformações quando o mouse sair
      heroRef.current.classList.remove('hero-hovered');
      
      const titleElement = heroRef.current.querySelector('h1');
      const accentLine = heroRef.current.querySelector('.accent-line');
      
      if (titleElement) {
        titleElement.style.transform = '';
      }
      
      if (accentLine) {
        accentLine.style.transform = '';
      }
      
      // Reseta as variáveis CSS para o centro
      heroRef.current.style.setProperty('--mouse-x', '0.5');
      heroRef.current.style.setProperty('--mouse-y', '0.5');
    };
    
    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
      heroRef.current.addEventListener('mouseenter', handleMouseEnter);
      heroRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
        heroRef.current.removeEventListener('mouseenter', handleMouseEnter);
        heroRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="w-full h-[70vh] bg-cover bg-center relative overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'calc(50% + calc(var(--mouse-x, 0.5) - 0.5) * 30px) calc(50% + calc(var(--mouse-y, 0.5) - 0.5) * 30px)',
        transition: 'background-position 0.3s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-12 transition-opacity duration-300">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-lg mb-6 transition-transform duration-300">
          {title}
        </h1>
        <div className="w-24 h-1 bg-sky-400 rounded-full mb-8 accent-line transition-transform duration-300"></div>
      </div>
    </div>
  );
}
