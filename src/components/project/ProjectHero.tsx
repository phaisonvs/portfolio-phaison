
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectHeroProps {
  image: string;
  title: string;
}

export function ProjectHero({ image, title }: ProjectHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || isMobile) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);
  
  return (
    <div 
      ref={heroRef}
      className="w-full h-[70vh] bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: isMobile ? 'center center' : 'calc(50% + calc(var(--mouse-x, 0.5) - 0.5) * 20px) calc(50% + calc(var(--mouse-y, 0.5) - 0.5) * 20px)',
        transition: 'background-position 0.2s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 md:p-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6">
          {title}
        </h1>
        <div className="w-24 h-1 bg-emerald-400 rounded-full mb-8"></div>
      </div>
    </div>
  );
}
