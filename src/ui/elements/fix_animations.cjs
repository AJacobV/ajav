const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix LoadingScreen exit animation
code = code.replace(
  'exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}',
  'exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}'
);

// 2. Wrap background graphics in a flickering div
// Find start of background graphics
const bgStart = code.indexOf('{/* 1. Massive Background Text - Scrolling horizontally and vertically */}');
// Find start of original vertical text block (which is foreground)
const contentStart = code.indexOf('{/* 4. Original Vertical Text Block - Parallax scrolling */}');

if (bgStart > -1 && contentStart > -1) {
  const bgCode = code.substring(bgStart, contentStart);
  
  const wrappedBg = `
      {/* ========================================================= */}
      {/* FLICKERING BACKGROUND LAYER */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: [0, 1, 0, 1, 0.5, 1] } : { opacity: 0 }}
        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
  ` + bgCode + `
      {/* Decorative Grids, Dots & Lines - Scattered and Repositioning! */}
      <DashedLine vertical left="15%" top="0" style={{ y: useTransform(smoothScroll, [0, 1], ["-10%", "10%"]) }} />
      <DashedLine vertical left="85%" top="0" style={{ y: useTransform(smoothScroll, [0, 1], ["10%", "-10%"]) }} />
      <DashedLine top="15%" left="0" style={{ x: useTransform(smoothScroll, [0, 1], ["-5%", "5%"]) }} />
      <DashedLine bottom="15%" left="0" style={{ x: useTransform(smoothScroll, [0, 1], ["5%", "-5%"]) }} />
      
      <Crosshair left="15%" top="15%" style={{ x: crosshair1X, rotate: shapeRotate }} />
      <Crosshair left="85%" top="15%" style={{ y: crosshair2Y, scale: shapeScale }} />
      <Crosshair left="15%" bottom="15%" style={{ y: useTransform(smoothScroll, [0, 1], ["0vh", "-30vh"]) }} />
      <Crosshair left="85%" bottom="15%" style={{ x: useTransform(smoothScroll, [0, 1], ["0vw", "-20vw"]) }} />

      <DotGrid top="5%" left="20%" rows={3} cols={6} style={{ rotate: gridRotate }} />
      <DotGrid top="5%" right="20%" rows={3} cols={6} style={{ scale: shapeScale }} />
      <DotGrid bottom="5%" left="20%" rows={3} cols={6} style={{ x: useTransform(smoothScroll, [0, 1], ["0vw", "10vw"]) }} />
      <DotGrid bottom="5%" right="20%" rows={3} cols={6} style={{ y: useTransform(smoothScroll, [0, 1], ["0vh", "-10vh"]) }} />
      </motion.div>
  `;

  // We need to also remove the decorative grids from their original position to prevent duplication.
  const gridsStart = code.indexOf('{/* 6. Decorative Grids, Dots & Lines - Scattered and Repositioning! */}');
  const scrollIndicatorStart = code.indexOf('{/* Scroll indicator crosshair at bottom center */}');
  
  if (gridsStart > -1 && scrollIndicatorStart > -1) {
     const beforeGrids = code.substring(0, gridsStart);
     const afterGrids = code.substring(scrollIndicatorStart);
     code = beforeGrids + afterGrids;
  }
  
  const newBgStart = code.indexOf('{/* 1. Massive Background Text - Scrolling horizontally and vertically */}');
  const newContentStart = code.indexOf('{/* 4. Original Vertical Text Block - Parallax scrolling */}');
  
  code = code.substring(0, newBgStart) + wrappedBg + code.substring(newContentStart);
}

// 3. Wrap Content in a fading div
const contentLayerStart = code.indexOf('{/* 4. Original Vertical Text Block - Parallax scrolling */}');
const contentLayerEnd = code.lastIndexOf('</div>\n    </>\n');

if (contentLayerStart > -1 && contentLayerEnd > -1) {
  const wrappedContent = `
      {/* ========================================================= */}
      {/* FOREGROUND CONTENT LAYER (Delayed Fade In) */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full h-full"
      >
  ` + code.substring(contentLayerStart, contentLayerEnd) + `
      </motion.div>
  `;
  
  code = code.substring(0, contentLayerStart) + wrappedContent + code.substring(contentLayerEnd);
}

fs.writeFileSync('src/App.tsx', code);
