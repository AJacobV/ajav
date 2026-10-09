import { motion } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';

interface DotGridProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  className?: string;
  rows?: number;
  cols?: number;
  style?: MotionStyle;
}

export const DotGrid = ({ top, left, right, bottom, className = "", rows = 4, cols = 5, style }: DotGridProps) => (
  <motion.div 
    className={`absolute grid gap-3 opacity-60 pointer-events-none ${className}`} 
    style={{ 
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      top, left, right, bottom, ...style 
    }}
  >
    {Array.from({ length: rows * cols }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-sm" />
    ))}
  </motion.div>
);
