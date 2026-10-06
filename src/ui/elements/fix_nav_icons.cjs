const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the Left Navigation System block
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
            <div className={\`w-8 h-8 rounded-full border-[2px] flex items-center justify-center transition-colors duration-500 z-10 bg-white group-hover:border-black relative \${isActive ? 'border-black' : 'border-gray-700'}\`}>
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
              className={\`absolute left-4 h-8 bg-gray-800 transition-all duration-500 ease-out -z-10 group-hover:w-[120px] group-hover:opacity-100 \${isActive ? 'w-[120px] opacity-100' : 'w-[40px] opacity-40'}\`}
            />
            
            <div 
              className={\`absolute left-12 flex items-center transition-opacity duration-300 group-hover:opacity-100 \${isActive ? 'opacity-100' : 'opacity-0'}\`}
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

      `;
  code = code.substring(0, navStart) + newNavCode + code.substring(navEnd);
}

fs.writeFileSync('src/App.tsx', code);
