
import React, { useEffect, useRef } from 'react';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
}

export function ScrollAnimator({ 
  children, 
  className = "", 
  threshold = 0.1,
  delay = 0,
  once = true,
  rootMargin = '0px 0px -100px 0px'
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Style the element for animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.4s ease-out, transform 0.4s ease-out${delay ? ` ${delay}ms` : ''}`;
    element.style.willChange = 'opacity, transform';
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          });
          
          // Unobserve after animation if once is true
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Reset element if not once
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay, once, rootMargin]);

  return (
    <div 
      ref={elementRef} 
      className={className}
    >
      {children}
    </div>
  );
}
