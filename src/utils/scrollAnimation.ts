
// Utility functions for smooth scroll animations
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const setupScrollAnimations = () => {
  // Use a more efficient selector
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Create the observer with options optimized for performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add('animate');
          // Once animated, we no longer need to observe
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  // Batch DOM operations
  const elementsArray = Array.from(animateElements);
  requestAnimationFrame(() => {
    elementsArray.forEach((element) => {
      observer.observe(element);
    });
  });

  return () => {
    elementsArray.forEach((element) => {
      observer.unobserve(element);
    });
  };
};

// Optimize DOM animations by using requestAnimationFrame
export const animateWithRaf = (callback: FrameRequestCallback) => {
  let rafId: number;
  
  const animate = (time: number) => {
    callback(time);
    rafId = requestAnimationFrame(animate);
  };
  
  rafId = requestAnimationFrame(animate);
  
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  };
};

// Efficiently debounce function for scroll and resize events
export const debounce = (func: Function, wait: number) => {
  let timeout: number;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
};
