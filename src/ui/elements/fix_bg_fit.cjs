const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const newBgTexts = `
const bgTexts = [
  { text: "O P E R A T I V E", style: { top: "15vh", width: "100vw", textAlign: "center", fontSize: "8vw" } },
  { text: "C A L I B E R", style: { top: "45vh", paddingRight: "5vw", width: "100vw", textAlign: "right", fontSize: "11vw" } },
  { text: "S K I L L", style: { bottom: "15vh", paddingLeft: "5vw", width: "100vw", textAlign: "left", fontSize: "15vw" } },
  { text: "F L E X", style: { top: "20vh", paddingRight: "5vw", width: "100vw", textAlign: "right", fontSize: "20vw" } },
  { text: "R E A C H", style: { bottom: "20vh", paddingLeft: "5vw", width: "100vw", textAlign: "left", fontSize: "15vw" } },
];
`;

// Replace the old bgTexts array
code = code.replace(/const bgTexts = \[[\s\S]*?\];/m, newBgTexts.trim());

// Remove the hardcoded text-[20vw] from the h1 element so it uses the inline fontSize
code = code.replace(
  '<h1 className="text-[20vw] font-black whitespace-nowrap text-gray-900">',
  '<h1 className="font-black whitespace-nowrap text-gray-900">'
);

fs.writeFileSync('src/App.tsx', code);
