const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importCode = "import { Crosshair, DashedLine, DotGrid, LoadingScreen, RightBorder } from './ui';\n";
code = code.replace("import ContactMe from './ContactMe';", "import ContactMe from './ContactMe';\n" + importCode);

// Remove the components from App.tsx
// Regex to match from const Crosshair ... down to export default function App()
const regex = /const Crosshair[\s\S]*?(?=const bgTexts)/;
code = code.replace(regex, '');

fs.writeFileSync('src/App.tsx', code);
