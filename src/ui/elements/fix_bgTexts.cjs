const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the old declaration
code = code.replace(/const bgTexts = \[[\s\S]*?\];/m, '');

// Add it to the global scope just before 'export default function App()'
const globalBgTexts = `
const bgTexts = [
  { text: "O P E R A T I V E", style: { top: "5vh", left: "-5vw" } },
  { text: "C A L I B E R", style: { top: "40vh", right: "-10vw" } },
  { text: "S K I L L", style: { bottom: "5vh", left: "-5vw" } },
  { text: "F L E X", style: { top: "15vh", right: "5vw" } },
  { text: "R E A C H", style: { bottom: "15vh", right: "-5vw" } },
];
`;

code = code.replace('export default function App() {', globalBgTexts + '\nexport default function App() {');

fs.writeFileSync('src/App.tsx', code);
