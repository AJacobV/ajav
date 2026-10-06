const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import { Terminal, Mail, ArrowRight, User, Cpu, Layers, X } from 'lucide-react';",
  "import { Terminal, Mail, User, Cpu, Layers } from 'lucide-react';"
);

fs.writeFileSync('src/App.tsx', code);
