const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 2. ABOUT
code = code.replace(
  'className="w-full max-w-2xl bg-white border-2 border-gray-800 p-8 md:p-12 shadow-[8px_8px_0_0_#1f2937]"',
  'className="w-full max-w-2xl bg-white/80 backdrop-blur-md border-2 border-gray-800 p-8 md:p-12 shadow-[8px_8px_0_0_#1f2937]"'
);

// 3. TECH
code = code.replace(
  'className="w-full max-w-2xl bg-white p-8 md:p-12 border-l-[8px] border-gray-800 shadow-[8px_8px_0_0_#1f2937]"',
  'className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 md:p-12 border-l-[8px] border-gray-800 shadow-[8px_8px_0_0_#1f2937]"'
);

// Tech Items
code = code.replace(
  'className="bg-white border-2 border-gray-800 p-4 text-center group hover:bg-gray-800 transition-colors cursor-crosshair"',
  'className="bg-white/60 backdrop-blur-sm border-2 border-gray-800 p-4 text-center group hover:bg-gray-800 transition-colors cursor-crosshair"'
);

// 4. PROJECTS
code = code.replace(
  'className="aspect-video bg-white border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] hover:shadow-[4px_4px_0_0_#1f2937] hover:translate-y-1 hover:translate-x-1 transition-all"',
  'className="aspect-video bg-white/80 backdrop-blur-md border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] hover:shadow-[4px_4px_0_0_#1f2937] hover:translate-y-1 hover:translate-x-1 transition-all"'
);

// 5. CONTACT (Inputs)
code = code.replace(
  /className="w-full bg-white border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-50 transition-colors uppercase text-sm shadow-\[4px_4px_0_0_#1f2937\]"/g,
  'className="w-full bg-white/80 backdrop-blur-md border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-100 transition-colors uppercase text-sm shadow-[4px_4px_0_0_#1f2937]"'
);
code = code.replace(
  /className="w-full bg-white border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-50 transition-colors uppercase text-sm resize-none shadow-\[4px_4px_0_0_#1f2937\]"/g,
  'className="w-full bg-white/80 backdrop-blur-md border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-100 transition-colors uppercase text-sm resize-none shadow-[4px_4px_0_0_#1f2937]"'
);

fs.writeFileSync('src/App.tsx', code);
