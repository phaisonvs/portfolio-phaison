
import React, { useEffect, useRef } from 'react';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export function ScrollAnimator({ 
  children, 
  className = "", 
  threshold = 0.1,
  delay = 0 
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay if specified
            if (delay) {
              setTimeout(() => {
                entry.target.classList.add('animate');
              }, delay);
            } else {
              entry.target.classList.add('animate');
            }
            // Once animated, we can stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px'
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
  }, [threshold, delay]);

  return (
    <div 
      ref={elementRef} 
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}
