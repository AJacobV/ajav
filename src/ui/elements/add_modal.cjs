const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add X icon to imports
code = code.replace(
  "import { Terminal, Mail, ArrowRight, User, Cpu, Layers } from 'lucide-react';",
  "import { Terminal, Mail, ArrowRight, User, Cpu, Layers, X } from 'lucide-react';"
);

// 2. Add state for activeModal
code = code.replace(
  'const [activeSection, setActiveSection] = useState(0);',
  'const [activeSection, setActiveSection] = useState(0);\n  const [activeModal, setActiveModal] = useState<number | null>(null);'
);

// 3. Update the click handlers on the project cards
const oldProjectsCode = `          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "School / Side Projects", type: "Academic & Personal" },
              { title: "Client Side Projects", type: "Professional Work" }
            ].map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative">
                <div className="aspect-video bg-white/20 border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] hover:shadow-[4px_4px_0_0_#1f2937] hover:translate-y-1 hover:translate-x-1 transition-all cursor-pointer">
                  <div className="w-16 h-16 border-4 border-dashed border-gray-800 group-hover:rotate-90 transition-transform duration-700" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-black uppercase mb-1">{project.title}</h4>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{project.type}</p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}`;

const newProjectsCode = `          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "School / Side Projects", type: "Academic & Personal" },
              { title: "Client Side Projects", type: "Professional Work" }
            ].map((project, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="group relative cursor-pointer"
                onClick={() => setActiveModal(i)}
              >
                <div className="aspect-video bg-white/20 border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] group-hover:shadow-[4px_4px_0_0_#1f2937] group-hover:translate-y-1 group-hover:translate-x-1 transition-all">
                  <div className="w-16 h-16 border-4 border-dashed border-gray-800 group-hover:rotate-90 transition-transform duration-700" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-black uppercase mb-1">{project.title}</h4>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{project.type}</p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-colors pointer-events-none">
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}`;
code = code.replace(oldProjectsCode, newProjectsCode);

// 4. Inject the Modal UI at the bottom of the App component (before the final closing div)
const modalCode = `
      {/* 6. Projects Modal */}
      <AnimatePresence>
        {activeModal !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-white/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full max-w-7xl bg-white border-4 border-gray-900 shadow-[12px_12px_0_0_#1f2937] flex flex-col relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b-4 border-gray-900 p-6 md:p-8 bg-white z-10 shrink-0">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-black">
                    {activeModal === 0 ? "School & Side Projects" : "Client Side Projects"}
                  </h2>
                  <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-sm">
                    {activeModal === 0 ? "Academic research and personal experimental modules" : "Classified client operations and deployed systems"}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-14 h-14 flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors shadow-[4px_4px_0_0_#d1d5db] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <X size={32} />
                </button>
              </div>
              
              {/* Modal Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 relative">
                {/* Background Grid Pattern inside modal */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                   {[1, 2, 3, 4, 5, 6].map((item) => (
                     <div key={item} className="bg-white border-2 border-gray-900 shadow-[6px_6px_0_0_#1f2937] group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#1f2937] transition-all cursor-pointer flex flex-col h-full">
                       <div className="aspect-video bg-gray-100 border-b-2 border-gray-900 flex items-center justify-center overflow-hidden relative">
                          <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-10 transition-opacity" />
                          <span className="font-bold text-gray-300 tracking-widest text-2xl group-hover:scale-110 transition-transform duration-500">THUMBNAIL</span>
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                         <h4 className="text-xl font-black uppercase mb-2 group-hover:text-gray-600 transition-colors">Project Module {item}</h4>
                         <p className="text-sm text-gray-600 font-bold mb-6 flex-1">A comprehensive breakdown of the architecture, stack, and outcomes for this specific implementation.</p>
                         <div className="flex flex-wrap gap-2 mt-auto">
                           <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold uppercase shadow-[2px_2px_0_0_#1f2937]">React</span>
                           <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold uppercase shadow-[2px_2px_0_0_#1f2937]">Node</span>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
`;

const insertionPoint = code.lastIndexOf('</main>');
if (insertionPoint !== -1) {
  code = code.substring(0, insertionPoint) + modalCode + '\n      ' + code.substring(insertionPoint);
}

fs.writeFileSync('src/App.tsx', code);
