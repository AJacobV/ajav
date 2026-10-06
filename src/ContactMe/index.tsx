import { motion } from 'framer-motion';
import { Terminal, Mail } from 'lucide-react';

export default function ContactMe() {
  return (
    <section data-index="4" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">Secure Channel</h2>
          <p className="text-sm font-bold text-gray-500 tracking-widest uppercase">Establish connection with operator</p>
        </div>

        <form className="space-y-4">
          <input type="email" placeholder="SECURE COMM LINK (EMAIL)" className="w-full bg-white/20 border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-100 transition-colors uppercase text-sm shadow-[4px_4px_0_0_#1f2937]" />
          <textarea placeholder="PAYLOAD / MESSAGE" rows={4} className="w-full bg-white/20 border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-100 transition-colors uppercase text-sm resize-none shadow-[4px_4px_0_0_#1f2937]" />
          <button type="button" className="w-full bg-black text-white font-black uppercase tracking-widest py-4 mt-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#1f2937] hover:shadow-none hover:translate-y-1 hover:translate-x-1 active:translate-y-2 active:translate-x-2">
            <Terminal size={18} /> Execute Transmission
          </button>
        </form>

        <div className="flex justify-center gap-8 mt-12">
          <a href="#" className="text-gray-800 hover:text-black transition-colors font-black text-sm">[ GITHUB ]</a>
          <a href="#" className="text-gray-800 hover:text-black transition-colors font-black text-sm">[ LINKEDIN ]</a>
          <a href="#" className="text-gray-800 hover:text-black transition-colors"><Mail size={24} strokeWidth={3} /></a>
        </div>
      </motion.div>
    </section>
  );
}
