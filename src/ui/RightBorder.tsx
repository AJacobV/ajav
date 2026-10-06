import { motion } from 'framer-motion';

export const RightBorder = ({ style, className = "" }: any) => (
  <motion.div 
    className={`fixed right-0 top-0 h-screen w-8 md:w-10 z-40 flex flex-col gap-3 md:gap-4 pt-6 pointer-events-none ${className}`}
    style={style}
  >
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <div 
        key={i} 
        className="w-full h-14 md:h-16 bg-slate-500 opacity-80" 
        style={{ clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 75%)' }} 
      />
    ))}
  </motion.div>
);
