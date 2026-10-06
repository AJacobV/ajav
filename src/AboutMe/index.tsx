import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section data-index="1" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl bg-white/20 border-2 border-gray-800 p-8 md:p-12 shadow-[8px_8px_0_0_#1f2937]">
        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-4 mb-8">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-black">Operator Codex</h2>
          <span className="text-xs font-bold text-gray-500 tracking-widest">DATA_LOG_01</span>
        </div>
        <div className="space-y-6 text-sm md:text-base font-bold text-gray-700 leading-relaxed font-mono">
          <p>Graduated Cum Laude with a B.S. in Information Technology from the University of Santo Tomas. Passionate programmer building clean, user-friendly web experiences.</p>
          <p>Started with Java and expanded to React, Node.js, PHP, SQL, and ASP.NET.</p>
        </div>
        <div className="mt-8 pt-4 border-t-2 border-gray-800 flex gap-4">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xs">01</div>
          <div className="w-10 h-10 bg-gray-800" />
          <div className="w-10 h-10 bg-gray-800" />
        </div>
      </motion.div>
    </section>
  );
}
