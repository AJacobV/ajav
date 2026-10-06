const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const loadingComponent = `
import { AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING KERNEL...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 20) setText("LOADING ASSETS...");
    if (progress > 50) setText("COMPILING UI MODULES...");
    if (progress > 80) setText("ESTABLISHING NEXUS...");
    if (progress >= 100) setText("SYSTEM READY.");
  }, [progress]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center text-black font-mono"
    >
      <div className="w-full max-w-md p-8 border-[2px] border-black shadow-[8px_8px_0_0_#1f2937] relative bg-white">
        
        {/* Decorative Loading Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black translate-x-1 translate-y-1" />

        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">O P E R A T I V E</h1>
        <div className="h-[2px] w-full bg-black mb-8" />
        
        <div className="flex justify-between text-xs font-bold mb-2">
          <span>{text}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        
        <div className="w-full h-6 border-2 border-black p-1">
          <div className="h-full bg-black transition-all duration-100" style={{ width: \`\${Math.min(progress, 100)}%\` }} />
        </div>
        
        <div className="mt-8 text-[10px] text-gray-500 flex flex-col gap-1 font-bold">
          <span>> [SYS] Auth token verified</span>
          <span>> [SYS] Memory allocation... OK</span>
          <span style={{ opacity: progress > 40 ? 1 : 0 }}>> [NET] Handshake established</span>
          <span style={{ opacity: progress > 70 ? 1 : 0 }}>> [UI] Render pipeline active</span>
        </div>
      </div>
    </motion.div>
  );
};
`;

code = code.replace("import { motion, useScroll, useTransform, useSpring } from 'framer-motion';", "import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';");

// Insert loading component after imports
const rightBorderIndex = code.indexOf("const RightBorder");
code = code.substring(0, rightBorderIndex) + loadingComponent + '\n' + code.substring(rightBorderIndex);

// Add loading state to App
code = code.replace("export default function App() {\n  const [activeSection, setActiveSection] = useState(0);", "export default function App() {\n  const [loading, setLoading] = useState(true);\n  const [activeSection, setActiveSection] = useState(0);");

// Wrap return with AnimatePresence
code = code.replace("return (\n    <div className=\"relative w-full h-screen", "return (\n    <>\n      <AnimatePresence>\n        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}\n      </AnimatePresence>\n      <div className=\"relative w-full h-screen");

// Close the fragment at the end
const lastDivIndex = code.lastIndexOf("</div>");
code = code.substring(0, lastDivIndex + 6) + "\n    </>\n" + code.substring(lastDivIndex + 6);

fs.writeFileSync('src/App.tsx', code);
