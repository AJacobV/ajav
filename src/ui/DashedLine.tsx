import { motion } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';

interface DashedLineProps {
  vertical?: boolean;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  style?: MotionStyle;
}

export const DashedLine = ({ vertical, top, left, right, bottom, style }: DashedLineProps) => (
  <motion.div 
    className={`absolute pointer-events-none border-gray-700/60 ${vertical ? 'border-l-[2px] border-dashed h-full' : 'border-t-[2px] border-dashed w-full'}`}
    style={{ top, left, right, bottom, ...style }}
  />
);
