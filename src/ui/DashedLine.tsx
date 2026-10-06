import { motion } from 'framer-motion';

export const DashedLine = ({ vertical, top, left, right, bottom, style }: any) => (
  <motion.div 
    className={`absolute pointer-events-none border-gray-700/60 ${vertical ? 'border-l-[2px] border-dashed h-full' : 'border-t-[2px] border-dashed w-full'}`}
    style={{ top, left, right, bottom, ...style }}
  />
);
