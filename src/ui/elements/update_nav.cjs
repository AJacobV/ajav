const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Lucide icons to import
code = code.replace(
  "import { Terminal, Mail, ArrowRight } from 'lucide-react';",
  "import { Terminal, Mail, ArrowRight, User, Cpu, Layers } from 'lucide-react';"
);

// 2. Define navItems before App component
const navItemsCode = `
const navItems = [
  { label: 'HOME', icon: Terminal },
  { label: 'ABOUT', icon: User },
  { label: 'TECH', icon: Cpu },
  { label: 'WORK', icon: Layers },
  { label: 'COMMS', icon: Mail },
];
`;
code = code.replace('export default function App() {', navItemsCode + '\nexport default function App() {');

// 3. Replace the Left Navigation System block
const navStart = code.indexOf('{/* 5. Left Navigation System */}');
const navEnd = code.indexOf('{/* Parallax Right Border */}');

if (navStart > -1 && navEnd > -1) {
  const newNavCode = `{/* 5. Left Navigation System */}
      <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-12 md:gap-16 pointer-events-none">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeSection === i;
          return (
          <div 
            key={i} 
            className="relative flex items-center group pointer-events-auto cursor-pointer"
            onClick={() => {
              document.querySelector(\`section[data-index="\${i}"]\`)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className={\`w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-colors duration-500 z-10 bg-white group-hover:border-black \${isActive ? 'border-black' : 'border-gray-700'}\`}>
              {isActive && <motion.div layoutId="nav-dot" className="w-2 h-2 bg-black rounded-full" />}
            </div>
            
            <div 
              className={\`absolute left-3 h-8 bg-gray-800 transition-all duration-500 ease-out -z-10 group-hover:w-[130px] group-hover:opacity-100 \${isActive ? 'w-[130px] opacity-100' : 'w-[30px] opacity-40'}\`}
            />
            
            <div 
              className={\`absolute left-10 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-100 \${isActive ? 'opacity-100' : 'opacity-0'}\`}
            >
              <Icon size={14} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-bold tracking-widest text-[10px] md:text-xs text-white">
                {item.label}
              </span>
            </div>
          </div>
        )})}
        {/* Connecting Line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gray-700 -z-20" />
      </div>

      `;
  code = code.substring(0, navStart) + newNavCode + code.substring(navEnd);
}

fs.writeFileSync('src/App.tsx', code);
