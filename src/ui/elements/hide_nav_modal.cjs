const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Hide Left Navigation System when modal is active
code = code.replace(
  '<div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-12 md:gap-16 pointer-events-none">',
  '<div className={`fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-12 md:gap-16 pointer-events-none transition-opacity duration-500 ${activeModal !== null ? "opacity-0" : "opacity-100"}`}>'
);

// 2. Hide Parallax Right Border when modal is active
code = code.replace(
  '<motion.div \n        className="fixed top-0 right-0 w-24 h-[200vh] border-l-[8px] border-gray-800 flex flex-col z-0 pointer-events-none"',
  '<motion.div \n        className={`fixed top-0 right-0 w-24 h-[200vh] border-l-[8px] border-gray-800 flex flex-col z-0 pointer-events-none transition-opacity duration-500 ${activeModal !== null ? "opacity-0" : "opacity-100"}`}'
);

// 3. Add radically different decorative elements to the Modal interior
const oldModalContentArea = `{/* Modal Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 relative">
                {/* Background Grid Pattern inside modal */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">`;

const newModalContentArea = `{/* Modal Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 relative overflow-hidden">
                {/* 1. Modal-Specific Background Elements (Completely different from main page) */}
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
                     {[1,3,2,1,4,1,2,5,1,2,1,3].map((w, i) => <div key={i} className="bg-gray-900 h-full" style={{ width: \`\${w * 2}px\` }} />)}
                   </div>
                   <span className="text-[10px] font-bold font-mono tracking-widest text-gray-900">0x7F_ARCHIVE_DATA</span>
                </div>

                {/* Moving Scanline */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-gray-900/10 pointer-events-none z-0"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">`;

code = code.replace(oldModalContentArea, newModalContentArea);

fs.writeFileSync('src/App.tsx', code);
