
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to handle smooth scrolling for anchor links and scroll reset between routes
 * @param offset - The offset to apply when scrolling (to account for fixed headers)
 */
export function useSmoothScroll(offset: number = 100) {
  const location = useLocation();
  
  useEffect(() => {
    // Reset scroll when the route changes (not anchor)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);
  
  useEffect(() => {
    // Handle all anchor links on the page
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      // Check if the link is an anchor link
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      // Prevent default behavior
      e.preventDefault();
      
      // Get the target element
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Calculate position with offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // Smooth scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };
    
    // Add event listener to the document
    document.addEventListener('click', handleAnchorClick);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [offset]);
}
