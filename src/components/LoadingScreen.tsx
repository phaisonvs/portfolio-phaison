
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let frameId: number;
    
    // Target loading time in milliseconds (2 seconds)
    const targetTime = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      // Calculate progress based on elapsed time
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / targetTime, 1);
      
      setProgress(newProgress);
      
      if (newProgress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Delay the completion callback slightly for smoother transition
        setTimeout(onLoadingComplete, 300);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [onLoadingComplete]);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900"
      >
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Milton Ivan</h1>
            <p className="text-gray-600 dark:text-gray-400">Desenvolvedor Javascript</p>
          </div>
          
          <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-emerald-600 dark:bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="text-right mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
