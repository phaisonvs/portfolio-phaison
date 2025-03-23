
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface CircuitLinesProps {
  variant?: 'horizontal' | 'vertical' | 'grid' | 'diagonal';
  className?: string;
  color?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  interactOnScroll?: boolean;
}

export function CircuitLines({ 
  variant = 'horizontal', 
  className = '', 
  color = 'currentColor',
  density = 'medium',
  animated = true,
  interactOnScroll = true
}: CircuitLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!animated || !interactOnScroll || !containerRef.current) return;
    
    const container = containerRef.current;
    
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isInView = rect.top < viewportHeight && rect.bottom > 0;
      
      if (isInView) {
        const scrollProgress = 1 - (rect.top / viewportHeight);
        const clamped = Math.max(0, Math.min(1, scrollProgress));
        
        // Aplicar efeitos baseados no scroll
        container.style.setProperty('--scroll-progress', clamped.toString());
        
        // Adicionar classe para efeitos CSS quando visível
        container.classList.add('in-view');
      } else {
        container.classList.remove('in-view');
      }
    };
    
    // Executar uma vez para configurar o estado inicial
    handleScroll();
    
    // Throttle para performance
    let lastKnownScrollPosition = 0;
    let ticking = false;
    
    const onScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [animated, interactOnScroll]);
  
  // Configurações baseadas na densidade
  const getDensityConfig = () => {
    switch (density) {
      case 'low':
        return { lineCount: 3, nodeCount: 2 };
      case 'high':
        return { lineCount: 10, nodeCount: 8 };
      default: // medium
        return { lineCount: 6, nodeCount: 4 };
    }
  };
  
  const { lineCount, nodeCount } = getDensityConfig();
  
  // Gerar SVGs específicos para cada variante
  const renderVariant = () => {
    switch (variant) {
      case 'vertical':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="none">
            {Array.from({ length: lineCount }).map((_, idx) => {
              const x = 10 + (idx * 80 / lineCount);
              return (
                <g key={idx} className="circuit-line">
                  <path 
                    d={`M ${x} 0 V 400`} 
                    stroke={color} 
                    strokeWidth="1" 
                    strokeDasharray={idx % 3 === 0 ? "4 4" : undefined} 
                    className="circuit-path"
                  />
                  {Array.from({ length: nodeCount }).map((_, nodeIdx) => {
                    const y = 20 + (nodeIdx * 360 / nodeCount);
                    return (
                      <circle 
                        key={nodeIdx} 
                        cx={x} 
                        cy={y} 
                        r="2" 
                        fill={color} 
                        className="circuit-node"
                        style={{ 
                          animationDelay: `${(idx + nodeIdx) * 0.2}s`,
                          transformOrigin: `${x}px ${y}px` 
                        }} 
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        );
        
      case 'grid':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
            <defs>
              <pattern id="circuitGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path 
                  d="M 0 0 H 50 V 50 H 0 Z" 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                />
                <circle cx="0" cy="0" r="1.5" fill={color} className="circuit-node" />
                <circle cx="50" cy="0" r="1.5" fill={color} className="circuit-node" />
                <circle cx="0" cy="50" r="1.5" fill={color} className="circuit-node" />
                <circle cx="50" cy="50" r="1.5" fill={color} className="circuit-node" />
                <path 
                  d="M 25 0 V 25 H 50" 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="1" 
                  className="circuit-path" 
                  opacity="0.7"
                />
                <path 
                  d="M 0 25 H 25 V 50" 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="1" 
                  className="circuit-path" 
                  opacity="0.7"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitGrid)" />
          </svg>
        );
        
      case 'diagonal':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: lineCount }).map((_, idx) => {
              const offset = idx * 100 / lineCount;
              return (
                <g key={idx} className="circuit-line">
                  <path 
                    d={`M ${offset} 0 L 100 ${100 - offset}`} 
                    stroke={color} 
                    strokeWidth="1" 
                    className="circuit-path"
                  />
                  {Array.from({ length: 3 }).map((_, nodeIdx) => {
                    const t = (nodeIdx + 1) / 4;
                    const x = offset + t * (100 - offset);
                    const y = t * (100 - offset);
                    return (
                      <circle 
                        key={nodeIdx} 
                        cx={x} 
                        cy={y} 
                        r="1.5" 
                        fill={color} 
                        className="circuit-node"
                        style={{ 
                          animationDelay: `${(idx + nodeIdx) * 0.3}s`,
                          transformOrigin: `${x}px ${y}px` 
                        }} 
                      />
                    );
                  })}
                </g>
              );
            })}
            {Array.from({ length: lineCount }).map((_, idx) => {
              const offset = idx * 100 / lineCount;
              return (
                <g key={`reverse-${idx}`} className="circuit-line">
                  <path 
                    d={`M 0 ${offset} L ${100 - offset} 100`} 
                    stroke={color} 
                    strokeWidth="1" 
                    className="circuit-path"
                  />
                  {Array.from({ length: 3 }).map((_, nodeIdx) => {
                    const t = (nodeIdx + 1) / 4;
                    const x = t * (100 - offset);
                    const y = offset + t * (100 - offset);
                    return (
                      <circle 
                        key={nodeIdx} 
                        cx={x} 
                        cy={y} 
                        r="1.5" 
                        fill={color} 
                        className="circuit-node"
                        style={{ 
                          animationDelay: `${(idx + nodeIdx) * 0.3}s`,
                          transformOrigin: `${x}px ${y}px` 
                        }} 
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        );
        
      // Horizontal (padrão)
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            {Array.from({ length: lineCount }).map((_, idx) => {
              const y = 10 + (idx * 80 / lineCount);
              return (
                <g key={idx} className="circuit-line">
                  <path 
                    d={`M 0 ${y} H 400`} 
                    stroke={color} 
                    strokeWidth="1" 
                    strokeDasharray={idx % 3 === 0 ? "10 5" : undefined} 
                    className="circuit-path"
                  />
                  {Array.from({ length: nodeCount }).map((_, nodeIdx) => {
                    const x = 20 + (nodeIdx * 360 / nodeCount);
                    return (
                      <circle 
                        key={nodeIdx} 
                        cx={x} 
                        cy={y} 
                        r="2" 
                        fill={color} 
                        className="circuit-node"
                        style={{ 
                          animationDelay: `${(idx + nodeIdx) * 0.2}s`,
                          transformOrigin: `${x}px ${y}px` 
                        }} 
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        );
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'circuit-lines-container',
        animated && 'animated',
        interactOnScroll && 'interact-on-scroll',
        `variant-${variant}`,
        className
      )}
      style={{ '--color': color } as React.CSSProperties}
    >
      {renderVariant()}
    </div>
  );
}
