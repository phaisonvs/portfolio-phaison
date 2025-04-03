
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
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="w-full h-[70vh] bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'calc(50% + calc(var(--mouse-x, 0.5) - 0.5) * 20px) calc(50% + calc(var(--mouse-y, 0.5) - 0.5) * 20px)',
        transition: 'background-position 0.2s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-lg mb-6">
          {title}
        </h1>
        <div className="w-24 h-1 bg-sky-400 rounded-full mb-8"></div>
      </div>
    </div>
  );
}
