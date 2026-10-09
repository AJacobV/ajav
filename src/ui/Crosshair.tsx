import { motion } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';

interface CrosshairProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  className?: string;
  style?: MotionStyle;
}

export const Crosshair = ({ top, left, right, bottom, className = "", style }: CrosshairProps) => (
  <motion.div 
    className={`absolute w-12 h-12 pointer-events-none flex items-center justify-center opacity-70 -translate-x-1/2 -translate-y-1/2 ${className}`} 
    style={{ top, left, right, bottom, ...style }}
  >
    <div className="absolute w-full h-[2px] bg-transparent border-t-[2px] border-dashed border-gray-700" />
    <div className="absolute h-full w-[2px] bg-transparent border-l-[2px] border-dashed border-gray-700" />
    <div className="absolute w-4 h-4 bg-white border-[2px] border-gray-800" /> 
  </motion.div>
);
