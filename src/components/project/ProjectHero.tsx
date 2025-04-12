
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
    if (isMobile || !heroRef.current) return;
    
    // Use pointer events for better performance instead of mousemove
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = heroRef.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        heroRef.current!.style.setProperty('--mouse-x', `${x}`);
        heroRef.current!.style.setProperty('--mouse-y', `${y}`);
      });
    };
    
    heroRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);
  
  return (
    <div 
      ref={heroRef}
      className="w-full h-[70vh] relative overflow-hidden will-change-auto"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center center' : 'calc(50% + calc(var(--mouse-x, 0.5) - 0.5) * 20px) calc(50% + calc(var(--mouse-y, 0.5) - 0.5) * 20px)',
        transition: 'background-position 0.3s cubic-bezier(0.2, 0, 0.1, 1)',
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
