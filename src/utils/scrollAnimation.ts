
// Utility functions for smooth scroll animations
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 100; // Adjust for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      behavior: 'smooth',
      top: offsetPosition,
    });
  }
};

// Optimized configuration for IntersectionObserver
export const setupScrollAnimations = () => {
  // Use a single IntersectionObserver instance for better performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            element.classList.add('animate');
            // Set will-change for better GPU acceleration
            element.style.willChange = 'opacity, transform';
            
            // Add a timeout to remove will-change after animation completes
            setTimeout(() => {
              element.style.willChange = 'auto';
            }, 500); // Animation duration
          });
          
          // Optionally, stop observing after animation
          if (element.getAttribute('data-observe-once') === 'true') {
            observer.unobserve(element);
          }
        } else if (element.getAttribute('data-observe-once') !== 'true') {
          // Remove the class with requestAnimationFrame
          requestAnimationFrame(() => {
            element.classList.remove('animate');
          });
        }
      });
    },
    {
      threshold: 0.1, // Start animation when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px', // Negative bottom margin to start animation a bit earlier
    }
  );

  // Select all elements with the class animate-on-scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observe each element
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Function to clean up the observer when needed
  return () => {
    animateElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};

// Function to animate elements based on scroll position with better performance
export const animateOnScroll = (element: HTMLElement, startOffset: number = 0.2, endOffset: number = 0.8) => {
  if (!element) return;

  // Use requestAnimationFrame for better performance
  let ticking = false;
  let rafId: number | null = null;
  
  const handleScroll = () => {
    if (ticking) return;
    
    ticking = true;
    rafId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate element visibility on screen
      const visiblePortion = 1 - (rect.bottom / windowHeight);
      
      // Normalize value between startOffset and endOffset
      const scrollProgress = Math.max(0, Math.min(1, (visiblePortion - startOffset) / (endOffset - startOffset)));
      
      // Apply the value as a custom CSS property
      element.style.setProperty('--scroll-progress', scrollProgress.toString());
      
      // Only use will-change when the element is entering or leaving the viewport
      if (scrollProgress > 0 && scrollProgress < 1) {
        element.classList.add('in-view');
        element.style.willChange = 'transform, opacity';
      } else {
        element.classList.remove('in-view');
        // Reset will-change when not in view
        if (scrollProgress <= 0 || scrollProgress >= 1) {
          element.style.willChange = 'auto';
        }
      }
      
      ticking = false;
    });
  };

  // Initial setup
  handleScroll();
  
  // Add scroll event with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Return function to clean up the event
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  };
};

// Setup animations for circuit elements
export const setupCircuitAnimations = () => {
  const circuitElements = document.querySelectorAll('.circuit-lines-container');
  
  circuitElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      animateOnScroll(element, 0.1, 0.7);
    }
  });
};
