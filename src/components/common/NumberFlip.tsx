import React, { useEffect, useRef, useState } from 'react';
import './NumberFlip.css';

interface NumberFlipProps {
  value: number;
  decimals?: number;
  suffix?: string;
  color?: string;
  fontSize?: number;
}

const NumberFlip: React.FC<NumberFlipProps> = ({
  value,
  decimals = 0,
  suffix = '',
  color = '#00d4ff',
  fontSize = 24,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef(value);

  useEffect(() => {
    const startVal = startValueRef.current;
    const endVal = value;
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = endVal;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value]);

  return (
    <span
      className="number-flip"
      style={{ color, fontSize: `${fontSize}px`, textShadow: `0 0 12px ${color}80` }}
    >
      {displayValue.toFixed(decimals)}{suffix && <span className="number-suffix">{suffix}</span>}
    </span>
  );
};

export default NumberFlip;
