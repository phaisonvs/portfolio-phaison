
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypeAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  repeat?: boolean;
  cursor?: boolean;
}

export const TypeAnimation: React.FC<TypeAnimationProps> = ({
  text,
  className,
  speed = 50,
  delay = 1000,
  repeat = false,
  cursor = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const startTyping = () => {
      setIsTyping(true);
      setIsDeleting(false);
      setDisplayText("");
    };
    
    const timeoutId = setTimeout(startTyping, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    const typeNextChar = () => {
      if (isDeleting) {
        // Deleting mode
        if (displayText.length === 0) {
          setIsDeleting(false);
          if (repeat) {
            timeoutRef.current = setTimeout(() => {
              setIsTyping(true);
            }, delay);
          } else {
            setIsTyping(false);
          }
          return;
        }
        
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        // Typing mode
        if (displayText.length === text.length) {
          if (repeat) {
            setIsDeleting(true);
            timeoutRef.current = setTimeout(typeNextChar, delay);
            return;
          } else {
            setIsTyping(false);
            return;
          }
        }
        
        setDisplayText((prev) => text.slice(0, prev.length + 1));
      }
      
      const nextSpeed = isDeleting ? speed / 1.5 : speed;
      timeoutRef.current = setTimeout(typeNextChar, nextSpeed);
    };
    
    timeoutRef.current = setTimeout(typeNextChar, speed);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTyping, isDeleting, displayText, text, speed, delay, repeat]);
  
  return (
    <span className={className}>
      {displayText}
      {cursor && isTyping && <span className="animate-blink">|</span>}
    </span>
  );
};

