const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add the bgTexts array before the return statement
const bgTextsCode = `
  const bgTexts = [
    { text: "O P E R A T I V E", style: { top: "5vh", left: "-5vw" } },
    { text: "C A L I B E R", style: { top: "40vh", right: "-10vw" } },
    { text: "S K I L L", style: { bottom: "5vh", left: "-5vw" } },
    { text: "F L E X", style: { top: "15vh", right: "5vw" } },
    { text: "R E A C H", style: { bottom: "15vh", right: "-5vw" } },
  ];

`;

const insertIndex = code.indexOf('return (');
code = code.substring(0, insertIndex) + bgTextsCode + code.substring(insertIndex);

// Find and replace the old Massive Background Text
const oldTextRegex = /\{\/\* 1\. Massive Background Text[\s\S]*?<\/motion\.div>/;
const newTextCode = `{/* 1. Massive Background Text - Dynamic Per Section */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.85, y: 100, filter: "blur(12px)" }}
            animate={{ opacity: 0.06, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, y: -100, filter: "blur(12px)", transition: { duration: 0.6 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute font-inter tracking-tighter leading-none"
            style={bgTexts[activeSection].style}
          >
            <h1 className="text-[20vw] font-black whitespace-nowrap text-gray-900">
              {bgTexts[activeSection].text}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>`;

code = code.replace(oldTextRegex, newTextCode);

// Also remove textX and textY from useTransform as they are no longer used
code = code.replace(/const textX = useTransform[\s\S]*?\]\);/, '');
code = code.replace(/const textY = useTransform[\s\S]*?\]\);/, '');

fs.writeFileSync('src/App.tsx', code);
