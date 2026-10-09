import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  let text = "INITIALIZING...";
  if (progress >= 100) text = "SYSTEM READY.";
  else if (progress > 80) text = "ESTABLISHING NEXUS...";
  else if (progress > 50) text = "COMPILING UI MODULES...";
  else if (progress > 20) text = "LOADING ASSETS...";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay before hiding
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center text-black font-mono"
    >
      <div id="loading-box" className="w-[448px] h-[320px] max-w-[90vw] p-8 flex flex-col justify-center border-[2px] border-black shadow-[8px_8px_0_0_#1f2937] relative bg-white">
        {/* Decorative Loading Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-black -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-[2px] border-r-[2px] border-black translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[2px] border-l-[2px] border-black -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-black translate-x-1 translate-y-1" />

        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">O P E R A T I V E</h1>
        <div className="h-[2px] w-full bg-black mb-8" />
        
        <div className="flex justify-between text-xs font-bold mb-2">
          <span>{text}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        
        <div className="w-full h-6 border-2 border-black p-1">
          <div className="h-full bg-black transition-all duration-100" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        
        <div className="mt-8 text-[10px] text-gray-500 flex flex-col gap-1 font-bold">
          <span>&gt; [SYS] Auth token verified</span>
          <span>&gt; [SYS] Memory allocation... OK</span>
          <span style={{ opacity: progress > 40 ? 1 : 0 }}>&gt; [NET] Handshake established</span>
          <span style={{ opacity: progress > 70 ? 1 : 0 }}>&gt; [UI] Render pipeline active</span>
        </div>
      </div>
    </motion.div>
  );
};
