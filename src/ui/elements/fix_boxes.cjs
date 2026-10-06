const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert LoadingScreen Box to original Brutalist style
code = code.replace(
  '<div className="w-[450px] h-[450px] max-w-[90vw] p-8 flex flex-col justify-center border-[6px] border-gray-300 relative bg-white">',
  `<div id="loading-box" className="w-[448px] h-[320px] max-w-[90vw] p-8 flex flex-col justify-center border-[2px] border-black shadow-[8px_8px_0_0_#1f2937] relative bg-white">
        {/* Decorative Loading Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-black -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-[2px] border-r-[2px] border-black translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[2px] border-l-[2px] border-black -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-black translate-x-1 translate-y-1" />`
);

// 2. Change the Morphing Shape to animate its styling from the loading box style
// Remove static class name parts
code = code.replace(
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] max-w-[90vw] border-[6px] border-gray-300 z-0 pointer-events-none"',
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"'
);

// Add the dynamic Framer Motion properties for the shape
code = code.replace(
  'const shapeScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.5, 0.8]);',
  `const shapeScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.5, 0.8]);
  const shapeWidth = useTransform(smoothScroll, [0, 0.1, 1], ["448px", "450px", "450px"]);
  const shapeHeight = useTransform(smoothScroll, [0, 0.1, 1], ["320px", "450px", "450px"]);
  const shapeBorder = useTransform(smoothScroll, [0, 0.1, 1], ["2px solid #000000", "8px solid #1f2937", "8px solid #1f2937"]);
  const shapeShadow = useTransform(smoothScroll, [0, 0.1, 1], ["8px 8px 0px 0px #1f2937", "0px 0px 0px 0px #1f2937", "0px 0px 0px 0px #1f2937"]);`
);

// Inject the properties into the style tag
code = code.replace(
  'clipPath: shapeClipPath,',
  `clipPath: shapeClipPath,
          width: shapeWidth,
          height: shapeHeight,
          border: shapeBorder,
          boxShadow: shapeShadow,`
);

fs.writeFileSync('src/App.tsx', code);
