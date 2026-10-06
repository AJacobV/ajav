import { motion } from 'framer-motion';

export default function Tech() {
  const categories = [
    {
      name: "Frontend",
      items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS']
    },
    {
      name: "Backend",
      items: ['Node.js', 'PHP', 'Java', 'Kotlin', 'Laravel', 'ASP.NET']
    },
    {
      name: "Database & BaaS",
      items: ['SQL', 'PostgreSQL', 'NoSQL', 'Supabase', 'Firebase']
    },
    {
      name: "Tools & Deployment",
      items: ['Git', 'Claude Code', 'Draw.io', 'Backblaze', 'Render', 'Vercel', 'Netlify']
    }
  ];

  return (
    <section data-index="2" className="snap-start snap-always w-full min-h-screen flex flex-col justify-center relative py-12">
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-5xl bg-white/20 p-6 md:p-10 border-l-[8px] border-gray-800 shadow-[8px_8px_0_0_#1f2937] mx-auto">
        <h3 className="text-xl md:text-3xl font-black text-black uppercase tracking-widest mb-6">Arsenal & Frameworks</h3>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((category, catIndex) => (
            <div key={category.name} className="border-2 border-gray-800 bg-white/30 p-4 shadow-[4px_4px_0_0_#1f2937] flex flex-col">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-3 border-b-2 border-gray-800/20 pb-2">
                {category.name}
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 flex-1 content-start">
                {category.items.map((tech, i) => (
                  <motion.div 
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (catIndex * 0.1) + (i * 0.05) }}
                    className="bg-white/50 border-2 border-gray-800 p-1 min-h-[48px] flex items-center justify-center text-center group hover:bg-gray-800 transition-colors cursor-crosshair"
                  >
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors leading-tight">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span>// STATUS: OPTIMAL</span>
          <span>SYS.VER: 4.0.1</span>
        </div>
      </motion.div>
    </section>
  );
}
