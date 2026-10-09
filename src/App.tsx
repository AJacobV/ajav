import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

import AboutMe from './AboutMe';
import Tech from './Tech';
import Projects from './Projects';
import ContactMe from './ContactMe';
import { Crosshair, DashedLine, DotGrid, LoadingScreen, RightBorder } from './ui';


import { Terminal, Mail, User, Cpu, Layers } from 'lucide-react';

import type { CSSProperties } from 'react';

const bgTexts: { text: string; style: CSSProperties }[] = [
  { text: "O P E R A T I V E", style: { top: "15vh", width: "100vw", textAlign: "center", fontSize: "8vw" } },
  { text: "C A L I B E R", style: { top: "45vh", paddingRight: "5vw", width: "100vw", textAlign: "right", fontSize: "11vw" } },
  { text: "S K I L L", style: { bottom: "15vh", paddingLeft: "5vw", width: "100vw", textAlign: "left", fontSize: "15vw" } },
  { text: "F L E X", style: { top: "20vh", paddingRight: "5vw", width: "100vw", textAlign: "right", fontSize: "20vw" } },
  { text: "R E A C H", style: { bottom: "20vh", paddingLeft: "5vw", width: "100vw", textAlign: "left", fontSize: "15vw" } },
];


const navItems = [
  { label: 'HOME', icon: Terminal },
  { label: 'ABOUT', icon: User },
  { label: 'TECH', icon: Cpu },
  { label: 'WORK', icon: Layers },
  { label: 'COMMS', icon: Mail },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Core Scroll Tracker
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // 1. The Morphing Shape Animation
  // Square -> Circle -> Triangle -> Circle -> Diamond
  const shapeBorderRadius = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0%", "50%", "15%", "50%", "0%"]);
  
  const shapeRotate = useTransform(smoothScroll, [0, 1], [0, 360]);
  const shapeScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.5, 0.8]);
  const shapeWidth = useTransform(smoothScroll, [0, 0.25, 1], ["448px", "450px", "450px"]);
  const shapeHeight = useTransform(smoothScroll, [0, 0.25, 1], ["320px", "450px", "450px"]);
  const shapeBorder = useTransform(smoothScroll, [0, 0.25, 1], ["2px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]);
  const shapeShadow = useTransform(smoothScroll, [0, 0.1, 1], ["none", "none", "none"]);
  // Move shape across the screen for each section
  const shapeX = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vw", "30vw", "-35vw", "25vw", "-15vw"]);
  const shapeY = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vh", "30vh", "-25vh", "25vh", "-10vh"]);
  
  // 2. Element Dispersal Animations
  const ringsRotate = useTransform(smoothScroll, [0, 1], [0, -180]);
  // Rings travel from top right to bottom left
  const ringsX = useTransform(smoothScroll, [0, 1], ["25%", "-60%"]);
  const ringsY = useTransform(smoothScroll, [0, 1], ["-25%", "60%"]);
  
  
  
  

  const crosshair1X = useTransform(smoothScroll, [0, 1], ["0vw", "20vw"]);
  const crosshair2Y = useTransform(smoothScroll, [0, 1], ["0vh", "30vh"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { threshold: 0.5 }
    );
    
    document.querySelectorAll('section[data-index]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div className="relative w-full h-screen overflow-hidden bg-white text-black font-mono selection:bg-black selection:text-white">
      
      {/* ========================================================= */}
      {/* GLOBAL UI OVERLAYS & BACKGROUND GRAPHICS */}
      {/* ========================================================= */}

      
      {/* ========================================================= */}
      {/* FLICKERING BACKGROUND LAYER */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: [0, 1, 0, 1, 0.5, 1] } : { opacity: 0 }}
        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
  {/* 1. Massive Background Text - Dynamic Per Section */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.85, y: 100, filter: "blur(12px)" }}
            animate={{ opacity: 0.06, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, y: -100, filter: "blur(12px)", transition: { duration: 0.6 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute font-inter tracking-tighter leading-none"
            style={bgTexts[activeSection].style}
          >
            <h1 className="font-black whitespace-nowrap text-gray-900">
              {bgTexts[activeSection].text}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. THE MORPHING SHAPE (Square -> Circle -> Triangle -> Diamond) */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-20"
        style={{
          borderRadius: shapeBorderRadius,
          
          width: shapeWidth,
          height: shapeHeight,
          border: shapeBorder,
          boxShadow: shapeShadow,
          rotate: shapeRotate,
          scale: shapeScale,
          x: shapeX,
          y: shapeY,
          originX: 0.5,
          originY: 0.5,
        }}
      />

      {/* 3. Massive Circular Rings - Rotating and panning across screen */}
      <motion.div 
        className="fixed top-0 right-0 w-[100vh] h-[100vh] rounded-full border-[6px] border-gray-800 z-0 pointer-events-none opacity-20"
        style={{ x: ringsX, y: ringsY, rotate: ringsRotate }}
      />
      <motion.div 
        className="fixed top-0 right-0 w-[85vh] h-[85vh] z-0 pointer-events-none opacity-30"
        style={{ x: useTransform(smoothScroll, [0, 1], ["15%", "-75%"]), y: ringsY }}
      >
        <div className="w-full h-full rounded-full border-[3px] border-dashed border-gray-700" style={{ animation: 'spin 120s linear infinite' }} />
      </motion.div>

      
      {/* Decorative Grids, Dots & Lines - Scattered and Repositioning! */}
      <DashedLine vertical left="15%" top="0" style={{ y: useTransform(smoothScroll, [0, 1], ["-10%", "10%"]) }} />
      <DashedLine vertical left="85%" top="0" style={{ y: useTransform(smoothScroll, [0, 1], ["10%", "-10%"]) }} />
      <DashedLine top="15%" left="0" style={{ x: useTransform(smoothScroll, [0, 1], ["-5%", "5%"]) }} />
      <DashedLine bottom="15%" left="0" style={{ x: useTransform(smoothScroll, [0, 1], ["5%", "-5%"]) }} />
      
      <Crosshair left="15%" top="15%" style={{ x: crosshair1X, rotate: shapeRotate }} />
      <Crosshair left="85%" top="15%" style={{ y: crosshair2Y, scale: shapeScale }} />
      <Crosshair left="15%" bottom="15%" style={{ y: useTransform(smoothScroll, [0, 1], ["0vh", "-30vh"]) }} />
      <Crosshair left="85%" bottom="15%" style={{ x: useTransform(smoothScroll, [0, 1], ["0vw", "-20vw"]) }} />

      <DotGrid top="5%" left="20%" rows={3} cols={6} />
      <DotGrid top="5%" right="20%" rows={3} cols={6} style={{ scale: shapeScale }} />
      <DotGrid bottom="5%" left="20%" rows={3} cols={6} style={{ x: useTransform(smoothScroll, [0, 1], ["0vw", "10vw"]) }} />
      <DotGrid bottom="5%" right="20%" rows={3} cols={6} style={{ y: useTransform(smoothScroll, [0, 1], ["0vh", "-10vh"]) }} />
      </motion.div>
  
      {/* ========================================================= */}
      {/* FOREGROUND CONTENT LAYER (Delayed Fade In) */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full h-full"
      >
  {/* 4. Original Vertical Text Block - Static */}
      <div 
        className={`fixed right-24 md:right-48 bottom-12 z-0 flex gap-4 pointer-events-none scale-75 md:scale-90 origin-bottom-right transition-opacity duration-500 ${activeSection === 2 || activeSection === 3 ? 'opacity-0' : 'opacity-80'}`}
      >
        <div className="absolute -inset-8 bg-gray-200/40 backdrop-blur-sm border border-gray-700/50 -z-10 -skew-x-6" />
        
        <div className="flex flex-col text-7xl font-black text-gray-800 leading-[0.85] tracking-tighter">
          <span>A</span><span>J</span><span>A</span><span>V</span>
        </div>
        <div className="flex flex-col text-2xl font-black text-gray-600 leading-[1.3] tracking-[0.3em] mt-1">
          <span>S</span><span>Y</span><span>S</span><span>T</span><span>E</span><span>M</span>
        </div>
      </div>

      {/* 5. Left Navigation System */}
      <div className={`fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-12 md:gap-16 pointer-events-none transition-opacity duration-500 ${activeModal !== null ? "opacity-0" : "opacity-100"}`}>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeSection === i;
          return (
          <div 
            key={i} 
            className="relative flex items-center group pointer-events-auto cursor-pointer"
            onClick={() => {
              document.querySelector(`section[data-index="${i}"]`)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className={`w-8 h-8 rounded-full border-[2px] flex items-center justify-center transition-colors duration-500 z-10 bg-white group-hover:border-black relative ${isActive ? 'border-black' : 'border-gray-700'}`}>
              {isActive && (
                <motion.div layoutId="nav-dot" className="absolute inset-0 flex items-center justify-center text-black">
                  <Icon size={16} strokeWidth={2.5} />
                </motion.div>
              )}
              
              {!isActive && (
                <>
                  <div className="absolute w-2 h-2 bg-gray-400 rounded-full group-hover:scale-0 transition-transform duration-300" />
                  <Icon size={16} strokeWidth={2.5} className="absolute text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                </>
              )}
            </div>
            
            <div 
              className={`absolute left-4 h-8 bg-gray-800 transition-all duration-500 ease-out -z-10 group-hover:w-[120px] group-hover:opacity-100 ${isActive ? 'w-[120px] opacity-100' : 'w-[40px] opacity-40'}`}
            />
            
            <div 
              className={`absolute left-12 flex items-center transition-opacity duration-300 group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="font-bold tracking-widest text-[10px] md:text-xs text-white">
                {item.label}
              </span>
            </div>
          </div>
        )})}
        {/* Connecting Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-700 -z-20 pointer-events-none" />
      </div>

      {/* Parallax Right Border */}
      <RightBorder className={`transition-opacity duration-500 ${activeModal !== null ? "opacity-0 pointer-events-none" : "opacity-100"}`} />

      {/* Scroll indicator crosshair at bottom center */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none transition-opacity duration-500 ${activeModal !== null ? 'opacity-0' : 'opacity-90'}`}>
        <Crosshair className="!relative translate-x-0 translate-y-0 w-8 h-8" style={{ rotate: useTransform(smoothScroll, [0, 1], [0, 720]) }} />
        <span className="text-[10px] tracking-widest font-bold text-gray-800 uppercase">SCROLL</span>
      </div>

      {/* ========================================================= */}
      {/* SCROLLING CONTAINER (Foreground Content) */}
      {/* ========================================================= */}
      <main ref={containerRef} className="relative z-10 w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar px-8 md:px-32 lg:px-64">
        
        {/* 1. HERO */}
        <section data-index="0" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-gray-500 font-bold text-sm tracking-widest mb-4">SYSTEM.INIT()</div>
            <h1 className="text-5xl md:text-8xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
              Angelo Jacob A.<br/> Valeros
            </h1>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-4 bg-gray-800" />
              <h2 className="text-xl md:text-2xl text-gray-600 uppercase tracking-widest font-bold">Class: Dev</h2>
            </div>
            <p className="max-w-lg text-sm text-gray-600 leading-relaxed uppercase border-l-[3px] border-gray-800 pl-4 font-bold">
              Deploying high-performance user interfaces. <br/>
              Awaiting command input.
            </p>
          </motion.div>
        </section>

        
        <AboutMe />
        <Tech />
        <Projects activeModal={activeModal} setActiveModal={setActiveModal} />
        <ContactMe />


      </main>
    
      </motion.div>
  </div>
    </>

  );
}
