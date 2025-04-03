
import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProjectFeaturesProps {
  features: Feature[];
  title: string;
}

export function ProjectFeatures({ features, title }: ProjectFeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-teal-50/30 to-white dark:from-navy-800/30 dark:to-navy-900">
      <div className="container">
        <h2 className="text-3xl font-bold mb-16 text-center">{title}</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-navy-700 group hover:border-sky-200 dark:hover:border-sky-900 grid-hover-effect"
              variants={itemVariants}
            >
              <div className="mb-6 p-4 rounded-full bg-sky-100 dark:bg-sky-900/20 w-16 h-16 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              
              {/* Grid dots for hover effect */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className="grid-dot"
                  style={{
                    top: `${Math.floor(i / 3) * 33.33}%`,
                    left: `${(i % 3) * 33.33}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
