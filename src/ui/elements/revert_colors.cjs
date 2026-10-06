const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert Loading Screen back to black borders and shadow
code = code.replace(
  '<div id="loading-box" className="w-[448px] h-[320px] max-w-[90vw] p-8 flex flex-col justify-center border-[2px] border-gray-800 shadow-[8px_8px_0_0_#1f2937] relative bg-white">',
  '<div id="loading-box" className="w-[448px] h-[320px] max-w-[90vw] p-8 flex flex-col justify-center border-[2px] border-black shadow-[8px_8px_0_0_#1f2937] relative bg-white">'
);
code = code.replace(/border-t-\[2px\] border-l-\[2px\] border-gray-800/g, 'border-t-[2px] border-l-[2px] border-black');
code = code.replace(/border-t-\[2px\] border-r-\[2px\] border-gray-800/g, 'border-t-[2px] border-r-[2px] border-black');
code = code.replace(/border-b-\[2px\] border-l-\[2px\] border-gray-800/g, 'border-b-[2px] border-l-[2px] border-black');
code = code.replace(/border-b-\[2px\] border-r-\[2px\] border-gray-800/g, 'border-b-[2px] border-r-[2px] border-black');
code = code.replace('<div className="h-[2px] w-full bg-gray-800 mb-8" />', '<div className="h-[2px] w-full bg-black mb-8" />');
code = code.replace('<div className="w-full h-6 border-2 border-gray-800 p-1">', '<div className="w-full h-6 border-2 border-black p-1">');
code = code.replace('<div className="h-full bg-gray-800 transition-all duration-100"', '<div className="h-full bg-black transition-all duration-100"');

// 2. Change the Morphing Shape to be purely dark gray and no shadow at all times
code = code.replace(
  'const shapeBorder = useTransform(smoothScroll, [0, 0.1, 1], ["2px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]);',
  'const shapeBorder = useTransform(smoothScroll, [0, 0.1, 1], ["8px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]);'
);
code = code.replace(
  'const shapeShadow = useTransform(smoothScroll, [0, 0.1, 1], ["8px 8px 0px 0px #1f2937", "0px 0px 0px 0px #1f2937", "0px 0px 0px 0px #1f2937"]);',
  'const shapeShadow = useTransform(smoothScroll, [0, 0.1, 1], ["none", "none", "none"]);'
);

// Optional: Also change the starting width/height to match the rest of the shape instead of morphing from the loading box size,
// since it's no longer trying to perfectly mimic the loading box transition.
code = code.replace(
  'const shapeWidth = useTransform(smoothScroll, [0, 0.1, 1], ["448px", "450px", "450px"]);',
  'const shapeWidth = useTransform(smoothScroll, [0, 0.1, 1], ["450px", "450px", "450px"]);'
);
code = code.replace(
  'const shapeHeight = useTransform(smoothScroll, [0, 0.1, 1], ["320px", "450px", "450px"]);',
  'const shapeHeight = useTransform(smoothScroll, [0, 0.1, 1], ["450px", "450px", "450px"]);'
);

fs.writeFileSync('src/App.tsx', code);
