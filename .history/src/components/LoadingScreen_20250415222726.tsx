import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

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

      // Make the visual progress bar grow more naturally
      // Use easing for a more polished effect
      const visualProgress = 1 - Math.pow(1 - newProgress, 3); // Cubic out easing

      setProgress(newProgress);
      setDisplayProgress(visualProgress);

      if (newProgress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Start exit animation when loading completes
        setIsExiting(true);
        setTimeout(onLoadingComplete, 800); // Give time for exit animation
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [onLoadingComplete]);

  // Variants for the container animation
  const containerVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
      },
    },
  };

  // Variants for content elements that will stagger out
  const contentVariants = {
    initial: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Variants for progress bar
  const progressVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: {
      scaleX: displayProgress,
      transition: {
        ease: "easeOut",
      },
    },
    complete: {
      scaleX: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 dark:bg-gray-950"
      >
        <motion.div variants={contentVariants} className="w-full max-w-md px-4">
          <motion.div variants={contentVariants} className="text-center mb-8">
            <motion.h1
              className="text-xl font-medium mb-2 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Milton Ivan
            </motion.h1>
            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Desenvolvedor Javascript
            </motion.p>
          </motion.div>

          <div className="relative h-1 mb-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-emerald-500"
              variants={progressVariants}
              initial="initial"
              animate={progress === 1 ? "complete" : "animate"}
            />
          </div>

          <motion.div variants={contentVariants} className="text-right mt-2">
            <span className="text-xs text-gray-400">
              {Math.round(progress * 100)}%
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
