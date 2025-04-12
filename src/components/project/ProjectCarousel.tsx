
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface ProjectCarouselProps {
  images: string[];
}

export function ProjectCarousel({ images }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        // Reset position on resize
        controls.start({ x: 0 });
        x.set(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [controls, x]);
  
  const handleDragEnd = () => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const carouselWidth = carousel.scrollWidth;
    const containerWidth = carousel.offsetWidth;
    const maxDrag = -(carouselWidth - containerWidth);
    
    // Ensure we don't drag beyond limits
    const currentX = x.get();
    if (currentX > 0) {
      controls.start({ x: 0 });
    } else if (currentX < maxDrag) {
      controls.start({ x: maxDrag });
    }
  };
  
  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <motion.div
        className="flex gap-6"
        drag="x"
        dragConstraints={carouselRef}
        dragElastic={0.2}
        style={{ x }}
        animate={controls}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] h-[300px] rounded-lg overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={image} 
              alt={`Project image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Arraste para ver mais imagens</p>
      </div>
    </div>
  );
}
