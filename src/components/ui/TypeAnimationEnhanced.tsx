
import React, { useEffect, useRef, useState } from 'react';

interface TypeAnimationEnhancedProps {
  sequence: string[];
  wrapper?: keyof JSX.IntrinsicElements;
  speed?: number;
  deletionSpeed?: number;
  repeat?: number | boolean;
  cursor?: boolean;
  className?: string;
  preRenderFirstString?: boolean;
  pauseDuration?: number;
}

export const TypeAnimationEnhanced: React.FC<TypeAnimationEnhancedProps> = ({
  sequence,
  wrapper = 'span',
  speed = 40,
  deletionSpeed = 40,
  repeat = Infinity,
  cursor = true,
  className = '',
  preRenderFirstString = false,
  pauseDuration = 4000,
}) => {
  const [displayText, setDisplayText] = useState(preRenderFirstString ? sequence[0] : '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const Wrapper = wrapper as any;

  useEffect(() => {
    const typeNextCharacter = () => {
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, pauseDuration);
        return;
      }

      const currentText = sequence[currentIndex];
      
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        } else {
          // Completed typing this string, pause before deleting
          setIsPaused(true);
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        }
      } else {
        // Deletion phase
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          timeoutRef.current = setTimeout(typeNextCharacter, deletionSpeed);
        } else {
          // Move to next string
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            
            // Check if we need to reset to beginning
            if (nextIndex >= sequence.length) {
              if (repeat === false) {
                return prevIndex; // Stop at the last string
              } else if (typeof repeat === 'number' && repeat <= 1) {
                return prevIndex; // Stop after specified repeats
              } else {
                return 0; // Loop back to beginning
              }
            }
            
            return nextIndex;
          });
        }
      }
    };

    // Start the animation
    timeoutRef.current = setTimeout(typeNextCharacter, speed);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, currentIndex, isDeleting, isPaused, sequence, speed, deletionSpeed, repeat, pauseDuration]);

  return (
    <Wrapper className={className}>
      {displayText}
      {cursor && <span className="animate-blink">|</span>}
    </Wrapper>
  );
};
