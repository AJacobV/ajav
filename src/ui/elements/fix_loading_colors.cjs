const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Loading Box outer border
code = code.replace(
  'border-[2px] border-black shadow-[8px_8px_0_0_#1f2937]',
  'border-[2px] border-gray-800 shadow-[8px_8px_0_0_#1f2937]'
);

// 2. Loading Box corner accents
code = code.replace('border-t-[2px] border-l-[2px] border-black', 'border-t-[2px] border-l-[2px] border-gray-800');
code = code.replace('border-t-[2px] border-r-[2px] border-black', 'border-t-[2px] border-r-[2px] border-gray-800');
code = code.replace('border-b-[2px] border-l-[2px] border-black', 'border-b-[2px] border-l-[2px] border-gray-800');
code = code.replace('border-b-[2px] border-r-[2px] border-black', 'border-b-[2px] border-r-[2px] border-gray-800');

// 3. Loading Box divider line and progress bar container
code = code.replace('<div className="h-[2px] w-full bg-black mb-8" />', '<div className="h-[2px] w-full bg-gray-800 mb-8" />');
code = code.replace('<div className="w-full h-6 border-2 border-black p-1">', '<div className="w-full h-6 border-2 border-gray-800 p-1">');
code = code.replace('<div className="h-full bg-black transition-all duration-100"', '<div className="h-full bg-gray-800 transition-all duration-100"');

// 4. Update the Morphing Shape Framer Motion starting border color
code = code.replace(
  '["2px solid #000000", "8px solid #1f2937", "8px solid #1f2937"]',
  '["2px solid #1f2937", "8px solid #1f2937", "8px solid #1f2937"]'
);

fs.writeFileSync('src/App.tsx', code);
