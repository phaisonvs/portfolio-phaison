import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let startTime: number;
    let frameId: number;

    // Loading time in milliseconds (use 2000ms for navigation, 5000ms for initial load)
    const targetTime = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      // Calculate actual progress based on elapsed time
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / targetTime, 1);

      // Make the visual progress bar grow more slowly than the percentage
      // This creates a lag effect where the progress bar is behind the actual percentage
      const visualProgress = Math.pow(newProgress, 1.25); // Apply a power curve to slow down the bar

      setProgress(newProgress);
      setDisplayProgress(visualProgress);

      if (newProgress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Loading complete
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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 dark:bg-gray-950"
      >
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium mb-2 text-white">Milton Ivan</h1>
            <p className="text-sm text-gray-400">Desenvolvedor Javascript</p>
          </div>

          <Progress value={displayProgress * 100} className="h-1 bg-gray-800" />

          <div className="text-right mt-2">
            <span className="text-xs text-gray-400">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
