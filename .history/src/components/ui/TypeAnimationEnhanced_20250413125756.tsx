import React, { useEffect, useRef, useState } from "react";

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
  wrapper = "span",
  speed = 40,
  deletionSpeed = 30,
  pauseDuration = 4000,
  repeat = 0,
  cursor = true,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );
  const repeatCountRef = useRef(typeof repeat === "number" ? repeat : Infinity);
  const cycleCompleteRef = useRef(0);

  const WrapperComponent = wrapper as any;

  useEffect(() => {
    if (!sequence.length) return;

    let timeout: NodeJS.Timeout;
    const currentString = sequence[currentIndex];

    const handlePhase = () => {
      switch (phase) {
        case "typing":
          if (displayText.length < currentString.length) {
            setDisplayText(currentString.substring(0, displayText.length + 1));
            timeout = setTimeout(handlePhase, speed);
          } else {
            // Typing complete, stay on screen without deletion
            // We'll set phase to pausing but never move to deleting
            setPhase("pausing");
            // No need to call handlePhase again - text will stay as is
          }
          break;

        case "pausing":
          // We'll never transition to deleting phase
          // This effectively keeps the text on screen indefinitely
          break;

        case "deleting":
          // This code won't run since we never transition to deleting phase
          // But keeping it for completeness
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
            timeout = setTimeout(handlePhase, deletionSpeed);
          } else {
            // Deletion complete, move to next string
            const nextIndex = (currentIndex + 1) % sequence.length;
            if (nextIndex === 0) {
              cycleCompleteRef.current += 1;

              // Check if we've reached the repeat limit
              if (
                typeof repeat === "number" &&
                cycleCompleteRef.current >= repeat
              ) {
                return; // Stop the animation
              }
            }

            setCurrentIndex(nextIndex);
            setPhase("typing");
            timeout = setTimeout(handlePhase, speed);
          }
          break;
      }
    };

    timeout = setTimeout(handlePhase, speed);

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentIndex,
    phase,
    sequence,
    speed,
    deletionSpeed,
    pauseDuration,
    repeat,
  ]);

  return (
    <WrapperComponent
      className={`${className} ${cursor ? "cursor" : ""} font-normal`}
    >
      {displayText}
    </WrapperComponent>
  );
};
