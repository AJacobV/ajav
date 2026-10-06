const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace bg-white/40 backdrop-blur-sm with bg-white/20 and no blur
code = code.replace(/bg-white\/40 backdrop-blur-sm/g, 'bg-white/20');
code = code.replace(/bg-white\/60 backdrop-blur-sm/g, 'bg-white/40'); // For the Tech inner items, make them slightly more opaque than the container

fs.writeFileSync('src/App.tsx', code);
