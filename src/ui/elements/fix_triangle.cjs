const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update the border radius sequence to be more dynamic since we are removing clip-path
code = code.replace(
  'const shapeBorderRadius = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0%", "50%", "0%", "50%", "0%"]);',
  'const shapeBorderRadius = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], ["0%", "50%", "15%", "50%", "0%"]);'
);

// 2. Remove shapeClipPath definition
code = code.replace(/const shapeClipPath = useTransform[\s\S]*?\]\);/, '');

// 3. Remove clipPath from the motion.div style
code = code.replace('clipPath: shapeClipPath,', '');

fs.writeFileSync('src/App.tsx', code);
