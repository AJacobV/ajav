import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Heart, Skull, Zap, Hexagon, Circle } from 'lucide-react';

const LDRShape = ({ isHovered }: { isHovered: boolean }) => {
  const [step, setStep] = useState(0);

  const paths = [
    // Square
    "M 12 2 C 22 2, 22 2, 22 12 C 22 22, 22 22, 12 22 C 2 22, 2 22, 2 12 C 2 2, 2 2, 12 2 Z",
    // Circle
    "M 12 2 C 17.52 2, 22 6.48, 22 12 C 22 17.52, 17.52 22, 12 22 C 6.48 22, 2 17.52, 2 12 C 2 6.48, 6.48 2, 12 2 Z",
    // Triangle (Larger, perfectly proportioned: 24x16, 5:3:3:5 dash ratio)
    "M 12 5 C 18 13, 18 13, 24 21 C 18 21, 18 21, 12 21 C 6 21, 6 21, 0 21 C 6 13, 6 13, 12 5 Z"
  ];

  useEffect(() => {
    if (!isHovered) {
      setStep(0);
      return;
    }
    const interval = setInterval(() => {
      setStep(prev => prev + 1);
    }, 800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const metaCycle = Math.floor(step / 9);
  const metaDegrees = metaCycle * 720; // 360 (Square) + 360 (Circle) + 0 (Triangle)
  const localStep = step % 9;
  
  const index = 
    localStep < 2 ? 0 // Square (steps 0, 1)
    : localStep < 5 ? 1 // Circle (steps 2, 3, 4)
    : 2; // Triangle (steps 5, 6, 7, 8)

  let currentRotation = metaDegrees;
  switch (localStep) {
    case 0: currentRotation += 0; break;
    case 1: currentRotation += 360; break;
    case 2: 
    case 3: 
    case 4: currentRotation += 720; break; // Circle animates 360 -> 720
    case 5: currentRotation += 720; break; // Triangle morphs, stays still
    case 6: currentRotation += 720; break; // Triangle splits
    case 7: currentRotation += 720; break; // Triangle spins
    case 8: currentRotation += 720; break; // Triangle merges
  }
  
  return (
    <div className="flex items-center justify-center w-16 h-16 relative">
      <motion.svg 
        viewBox="0 0 24 24" 
        className="w-full h-full text-gray-800 overflow-visible"
        animate={{ rotate: currentRotation }}
        transition={{ 
          rotate: index === 1 
            ? { duration: 2.4, ease: "linear" } 
            : { duration: 0.6, ease: "backOut" }
        }}
      >
        {/* Main Triangle/Shape */}
        <motion.g
          animate={{
            scale: localStep === 6 || localStep === 7 ? 0 : 1,
            opacity: localStep === 6 || localStep === 7 ? 0 : 1
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          style={{ originX: "12px", originY: "13px" }}
        >
          <motion.path
            d={paths[index]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="0.03125 0.03125"
            animate={{ d: paths[index] }}
            transition={{ duration: 0.6, ease: "backOut" }}
          />
        </motion.g>

        {/* Mini Triangle 1 (Flies Right, Spins 360) */}
        <motion.g
          initial={false}
          animate={{
            opacity: localStep === 6 || localStep === 7 ? 1 : 0,
            scale: localStep === 6 || localStep === 7 ? 0.5 : 0,
            x: localStep === 6 || localStep === 7 ? 22 : 0,
            rotate: localStep >= 7 ? 360 : 0
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          style={{ originX: "12px", originY: "13px" }}
        >
          <path
            d={paths[2]}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="0.03125 0.03125"
          />
        </motion.g>

        {/* Mini Triangle 2 (Flies Left, Spins -360) */}
        <motion.g
          initial={false}
          animate={{
            opacity: localStep === 6 || localStep === 7 ? 1 : 0,
            scale: localStep === 6 || localStep === 7 ? 0.5 : 0,
            x: localStep === 6 || localStep === 7 ? -22 : 0,
            rotate: localStep >= 7 ? -360 : 0
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          style={{ originX: "12px", originY: "13px" }}
        >
          <path
            d={paths[2]}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="0.03125 0.03125"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

const ProjectCard = ({ project, i, setActiveModal }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: i * 0.1 }} 
      className="group relative cursor-pointer"
      onClick={() => setActiveModal(i)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-white/20 border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] group-hover:shadow-[4px_4px_0_0_#1f2937] group-hover:translate-y-1 group-hover:translate-x-1 transition-all">
        <LDRShape isHovered={isHovered} />
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
  );
};

interface ProjectsProps {
  activeModal: number | null;
  setActiveModal: (val: number | null) => void;
}

export default function Projects({ activeModal, setActiveModal }: ProjectsProps) {
  const schoolProjects = [
    { title: "LMD: Dental Hub" },
    { title: "CICSelect" },
    { title: "GAWIN" },
    { title: "Recipe" },
    { title: "Falcon Eye: Incident and Lost & Found system" }
  ];

  const clientProjects = [
    { title: "ANV: encoding app" },
    { title: "Amore Luxe" },
    { title: "FIS" }
  ];

  const currentProjects = activeModal === 0 ? schoolProjects : clientProjects;

  return (
    <>
      <section data-index="3" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
        <div className="mb-12">
          <h3 className="text-3xl font-black text-black uppercase tracking-widest">Active Operations</h3>
          <div className="h-2 w-32 bg-gray-800 mt-4" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "School / Side Projects", type: "Academic & Personal" },
            { title: "Client Side Projects", type: "Professional Work" }
          ].map((project, i) => (
            <ProjectCard key={i} project={project} i={i} setActiveModal={setActiveModal} />
          ))}
        </div>
      </section>

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
              {/* ── Sci-fi Panel Modal Header ── */}
              <div className="shrink-0 z-10 bg-white">

                {/* ① Top cap bar – dark left block / angled notch / white gap / dark right cap */}
                <div className="flex h-8 border-b-2 border-gray-900 overflow-hidden">
                  <div
                    className="relative overflow-hidden bg-gray-900"
                    style={{ width: '38%' }}
                  >
                    {/* Subtle diagonal stripe highlight on the dark block */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(-55deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 3px, transparent 3px, transparent 9px)',
                      }}
                    />
                  </div>
                  {/* Angled notch transition */}
                  <div
                    className="bg-gray-900 shrink-0"
                    style={{ width: 28, clipPath: 'polygon(0 0, 55% 0, 100% 100%, 0 100%)' }}
                  />
                  {/* White centre gap */}
                  <div className="flex-1 bg-white" />
                  {/* Right dark accent cap */}
                  <div
                    className="bg-gray-900 shrink-0"
                    style={{ width: 44, clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
                  />
                </div>

                {/* ② Content row: stripe column + recessed title panel + X button */}
                <div className="flex items-stretch">

                  {/* Left diagonal-stripe column */}
                  <div className="shrink-0 w-14 border-r-2 border-gray-900 flex flex-col justify-center gap-[4px] px-2 py-3 overflow-hidden bg-white">
                    {[0,1,2,3,4,5,6,7].map((i) => (
                      <div
                        key={i}
                        className="h-[7px] bg-gray-900"
                        style={{ transform: 'skewX(-25deg)', opacity: i % 2 === 0 ? 1 : 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Recessed title panel */}
                  <div className="flex-1 flex items-center justify-between px-6 py-5 relative">
                    {/* Inner recess border */}
                    <div className="absolute inset-2 border border-gray-300 pointer-events-none" />
                    <div className="relative z-10">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-black">
                        {activeModal === 0 ? 'School & Side Projects' : 'Client Side Projects'}
                      </h2>
                      <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-sm">
                        {activeModal === 0
                          ? 'Academic research and personal experimental modules'
                          : 'Classified client operations and deployed systems'}
                      </p>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setActiveModal(null)}
                      className="relative z-10 w-14 h-14 flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors shadow-[4px_4px_0_0_#d1d5db] active:translate-y-1 active:translate-x-1 active:shadow-none shrink-0"
                    >
                      <X size={32} />
                    </button>
                  </div>
                </div>

                {/* ③ Bottom tick strip */}
                <div className="flex items-center h-7 border-t-2 border-gray-900 px-4 gap-[5px] overflow-hidden">
                  <div className="flex gap-[4px]">
                    {[0,1,2,3,4,5,6].map((i) => (
                      <div
                        key={i}
                        className="w-[14px] h-[14px] bg-gray-900"
                        style={{ transform: 'skewX(-20deg)' }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-px bg-gray-300 mx-2" />
                  <div className="flex gap-[4px]">
                    {[0,1,2].map((i) => (
                      <div
                        key={i}
                        className="w-[14px] h-[14px] bg-gray-900"
                        style={{ transform: 'skewX(-20deg)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 relative overflow-hidden">
                {/* 1. Modal-Specific Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
                
                {/* Huge Data Archive Text */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 opacity-[0.04] pointer-events-none origin-center">
                  <h1 className="text-[150px] font-black tracking-tighter whitespace-nowrap">ARCHIVE_SYS</h1>
                </div>

                {/* Technical Corner Brackets */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-gray-900 opacity-20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-gray-900 opacity-20 pointer-events-none" />
                
                {/* Barcode & Hex Data */}
                <div className="absolute bottom-4 left-4 opacity-30 pointer-events-none flex flex-col gap-1">
                   <div className="flex gap-1 h-8">
                     {[1,3,2,1,4,1,2,5,1,2,1,3].map((w, i) => <div key={i} className="bg-gray-900 h-full" style={{ width: `${w * 2}px` }} />)}
                   </div>
                   <span className="text-[10px] font-bold font-mono tracking-widest text-gray-900">0x7F_ARCHIVE_DATA</span>
                </div>

                {/* Moving Scanline */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-gray-900/10 pointer-events-none z-0"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                   {currentProjects.map((item, index) => (
                     <div key={index} className="bg-white border-2 border-gray-900 shadow-[6px_6px_0_0_#1f2937] group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#1f2937] transition-all cursor-pointer flex flex-col h-full">
                       <div className="aspect-video bg-gray-100 border-b-2 border-gray-900 flex items-center justify-center overflow-hidden relative">
                          <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-10 transition-opacity" />
                          <span className="font-bold text-gray-300 tracking-widest text-2xl group-hover:scale-110 transition-transform duration-500">THUMBNAIL</span>
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                         <h4 className="text-xl font-black uppercase mb-2 group-hover:text-gray-600 transition-colors">{item.title}</h4>
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
    </>
  );
}
