
import React, { useEffect, useRef } from 'react';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
  fromDirection?: 'bottom' | 'left' | 'right';
  distance?: number;
}

export function ScrollAnimator({ 
  children, 
  className = "", 
  threshold = 0.1,
  delay = 0,
  once = true,
  rootMargin = '0px 0px -100px 0px',
  fromDirection = 'bottom',
  distance = 20
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Prepare the transforms based on the direction
    let initialTransform = '';
    switch (fromDirection) {
      case 'left':
        initialTransform = `translateX(-${distance}px)`;
        break;
      case 'right':
        initialTransform = `translateX(${distance}px)`;
        break;
      case 'bottom':
      default:
        initialTransform = `translateY(${distance}px)`;
        break;
    }
    
    // Style the element for animation with improved performance
    element.style.opacity = '0';
    element.style.transform = initialTransform;
    element.style.transition = `opacity 0.4s ease-out, transform 0.4s ease-out${delay ? ` ${delay}ms` : ''}`;
    element.style.willChange = 'opacity, transform';
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
            
            // Remove will-change after animation completes to free up resources
            setTimeout(() => {
              element.style.willChange = 'auto';
            }, 400 + (delay || 0)); // match transition duration
          });
          
          // Unobserve after animation if once is true
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Reset element if not once
          element.style.opacity = '0';
          element.style.transform = initialTransform;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, delay, once, rootMargin, fromDirection, distance]);

  return (
    <div 
      ref={elementRef} 
      className={className}
    >
      {children}
    </div>
  );
}
