const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update LoadingScreen Box
code = code.replace(
  '<div className="w-full max-w-md p-8 border-[2px] border-black shadow-[8px_8px_0_0_#1f2937] relative bg-white">',
  '<div className="w-[450px] h-[450px] max-w-[90vw] p-8 flex flex-col justify-center border-[6px] border-gray-300 relative bg-white">'
);

// Remove the decorative corners from loading box to match a pure square
code = code.replace('<div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black -translate-x-1 -translate-y-1" />', '');
code = code.replace('<div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black translate-x-1 -translate-y-1" />', '');
code = code.replace('<div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black -translate-x-1 translate-y-1" />', '');
code = code.replace('<div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black translate-x-1 translate-y-1" />', '');

// 2. Update Morphing Shape
code = code.replace(
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] border-[8px] border-gray-800 z-0 pointer-events-none opacity-30"',
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] max-w-[90vw] border-[6px] border-gray-300 z-0 pointer-events-none"'
);

// 3. Keep Morphing shape at center for scroll 0
code = code.replace(
  'const shapeX = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vw", "30vw", "-35vw", "25vw", "-15vw"]);',
  'const shapeX = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vw", "30vw", "-35vw", "25vw", "-15vw"]);'
);
code = code.replace(
  'const shapeY = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vh", "30vh", "-25vh", "25vh", "-10vh"]);',
  'const shapeY = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0vh", "30vh", "-25vh", "25vh", "-10vh"]);'
);

fs.writeFileSync('src/App.tsx', code);
