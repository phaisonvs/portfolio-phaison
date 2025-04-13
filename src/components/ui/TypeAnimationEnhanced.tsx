
import React, { useEffect, useRef, useState } from 'react';

interface TypeAnimationEnhancedProps {
  sequence: string[];
  wrapper: keyof JSX.IntrinsicElements;
  speed?: number;
  deletionSpeed?: number;
  pauseDuration?: number;
  repeat?: number | boolean;
  cursor?: boolean;
  className?: string;
}

export const TypeAnimationEnhanced: React.FC<TypeAnimationEnhancedProps> = ({
  sequence,
  wrapper = 'span',
  speed = 40,
  deletionSpeed = 30,
  pauseDuration = 4000,
  repeat = 0,
  cursor = true,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const repeatCountRef = useRef(typeof repeat === 'number' ? repeat : Infinity);
  const cycleCompleteRef = useRef(0);
  
  const WrapperComponent = wrapper as any;
  
  useEffect(() => {
    if (!sequence.length) return;
    
    let timeout: NodeJS.Timeout;
    const currentString = sequence[currentIndex];
    
    const handlePhase = () => {
      switch (phase) {
        case 'typing':
          if (displayText.length < currentString.length) {
            setDisplayText(currentString.substring(0, displayText.length + 1));
            timeout = setTimeout(handlePhase, speed);
          } else {
            // Typing complete, pause before deletion
            setPhase('pausing');
            timeout = setTimeout(handlePhase, pauseDuration);
          }
          break;
          
        case 'pausing':
          // Pause complete, start deletion
          setPhase('deleting');
          timeout = setTimeout(handlePhase, deletionSpeed);
          break;
          
        case 'deleting':
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
            timeout = setTimeout(handlePhase, deletionSpeed);
          } else {
            // Deletion complete, move to next string
            const nextIndex = (currentIndex + 1) % sequence.length;
            if (nextIndex === 0) {
              cycleCompleteRef.current += 1;
              
              // Check if we've reached the repeat limit
              if (typeof repeat === 'number' && cycleCompleteRef.current >= repeat) {
                return; // Stop the animation
              }
            }
            
            setCurrentIndex(nextIndex);
            setPhase('typing');
            timeout = setTimeout(handlePhase, speed);
          }
          break;
      }
    };
    
    timeout = setTimeout(handlePhase, speed);
    
    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, phase, sequence, speed, deletionSpeed, pauseDuration, repeat]);
  
  return (
    <WrapperComponent className={`${className} ${cursor ? 'cursor' : ''} font-normal`}>
      {displayText}
    </WrapperComponent>
  );
};
