const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Re-add opacity-30 to make it blend with the background
code = code.replace(
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"',
  'className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-20"'
);

// 2. Fix the size so it perfectly matches the loading box again at scroll 0
code = code.replace(
  'const shapeWidth = useTransform(smoothScroll, [0, 0.1, 1], ["450px", "450px", "450px"]);',
  'const shapeWidth = useTransform(smoothScroll, [0, 0.25, 1], ["448px", "450px", "450px"]);'
);
code = code.replace(
  'const shapeHeight = useTransform(smoothScroll, [0, 0.1, 1], ["450px", "450px", "450px"]);',
  'const shapeHeight = useTransform(smoothScroll, [0, 0.25, 1], ["320px", "450px", "450px"]);'
);

// Optional: Make the border thickness slightly thinner to blend even more?
// Let's keep it 8px, but since it has opacity-20 it will look like a ghost trace.
// Or we can morph it from 2px (matching the loading box) to 8px.
code = code.replace(
  'const shapeBorder = useTransform(smoothScroll, [0, 0.1, 1], ["8px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]);',
  'const shapeBorder = useTransform(smoothScroll, [0, 0.25, 1], ["2px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]);'
);


fs.writeFileSync('src/App.tsx', code);
