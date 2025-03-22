
import React, { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
  }, [threshold]);

  useEffect(() => {
    let timeoutId: number;
    if (isVisible && delay > 0) {
      timeoutId = window.setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.classList.add('animate');
        }
      }, delay);
    } else if (isVisible) {
      if (elementRef.current) {
        elementRef.current.classList.add('animate');
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, delay]);

  return (
    <div 
      ref={elementRef} 
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}
