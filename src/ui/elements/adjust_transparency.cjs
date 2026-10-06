const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace bg-white/80 with bg-white/40 and backdrop-blur-md with backdrop-blur-sm
code = code.replace(/bg-white\/80/g, 'bg-white/40');
code = code.replace(/backdrop-blur-md/g, 'backdrop-blur-sm');

fs.writeFileSync('src/App.tsx', code);
