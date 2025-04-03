
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  title: string;
  date: string;
  description: string;
}

interface ProjectTimelineProps {
  items: TimelineItem[];
  title: string;
}

export function ProjectTimeline({ items, title }: ProjectTimelineProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white dark:from-navy-800/50 dark:to-navy-900">
      <div className="container">
        <h2 className="text-3xl font-bold mb-16 text-center">{title}</h2>
        
        <div className="relative">
          {/* Linha central do timeline */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-sky-200 dark:bg-navy-700 transform -translate-x-1/2 rounded-full"></div>
          
          <div className="relative space-y-12">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Conteúdo */}
                <div className={`w-5/12 p-6 bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-700 ${
                  index % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'
                }`}>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sky-600 dark:text-sky-400 text-sm mb-3">{item.date}</p>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                
                {/* Marcador central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-sky-500 dark:bg-blue-600 rounded-full border-4 border-white dark:border-navy-900 z-10 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
