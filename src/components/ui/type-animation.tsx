
"use client";

import React, { useEffect, useState, useRef } from 'react';

interface TypeAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export function TypeAnimation({ 
  text, 
  speed = 50, 
  className = "", 
  delay = 500 
}: TypeAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Delay inicial antes de começar a digitar
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && currentIndex < text.length && (
        <span className="inline-block w-1 h-5 ml-1 bg-current animate-pulse" />
      )}
    </span>
  );
}
