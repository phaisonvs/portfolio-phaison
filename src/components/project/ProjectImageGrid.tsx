
import React from 'react';
import { motion } from 'framer-motion';

interface ProjectImageGridProps {
  images: string[];
  title: string;
}

export function ProjectImageGrid({ images, title }: ProjectImageGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50/50 to-white dark:from-navy-900/50 dark:to-navy-900">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
            >
              <div className="relative group">
                <img 
                  src={image} 
                  alt={`Imagem ${index + 1} do projeto`} 
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <p className="text-white font-medium">Detalhe {index + 1}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
