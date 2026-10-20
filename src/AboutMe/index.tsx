import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import gradPic from '../assets/myprofpic/grad_pic.JPG';
import profPic2 from '../assets/myprofpic/profpic2.JPG';
import profPic3 from '../assets/myprofpic/profpic3.JPG';

const pictures = [
  { src: gradPic, alt: 'Graduation photo' },
  { src: profPic2, alt: 'Angelo Jacob A. Valeros' },
  { src: profPic3, alt: 'Angelo Jacob A. Valeros' },
];

export default function AboutMe() {
  const [showPics, setShowPics] = useState(false);

  return (
    <section data-index="1" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-2xl bg-white/20 border-2 border-gray-800 p-8 md:p-12 shadow-[8px_8px_0_0_#1f2937]">
        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-4 mb-8">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-black">Operator Codex</h2>
          <span className="text-xs font-bold text-gray-500 tracking-widest">DATA_LOG_01</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {showPics ? (
            <motion.div
              key="collage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 grid-rows-2 gap-3 h-72 md:h-80"
            >
              <img src={pictures[0].src} alt={pictures[0].alt} className="row-span-2 w-full h-full object-cover border-2 border-gray-800" />
              <img src={pictures[1].src} alt={pictures[1].alt} className="w-full h-full object-cover border-2 border-gray-800" />
              <img src={pictures[2].src} alt={pictures[2].alt} className="w-full h-full object-cover border-2 border-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 text-sm md:text-base font-bold text-gray-700 leading-relaxed font-mono"
            >
              <p>Graduated Cum Laude with a B.S. in Information Technology from the University of Santo Tomas. Passionate programmer building clean, user-friendly web experiences.</p>
              <p>Started with Java and expanded to React, Node.js, PHP, SQL, and ASP.NET.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-8 pt-4 border-t-2 border-gray-800 flex gap-4">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs">01</div>
          <div className="w-10 h-10 bg-gray-800" />
        </div>
        <button
          type="button"
          aria-label={showPics ? 'Back to about' : 'View pictures'}
          onClick={() => setShowPics((v) => !v)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-gray-800 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
        >
          <ArrowRight size={20} strokeWidth={3} className={`transition-transform duration-300 ${showPics ? 'rotate-180' : ''}`} />
        </button>
      </motion.div>

    </section>
  );
}
