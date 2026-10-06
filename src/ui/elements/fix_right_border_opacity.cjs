const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<RightBorder style={{ y: useTransform(smoothScroll, [0, 1], ["0%", "10%"]) }} />',
  '<RightBorder className={`transition-opacity duration-500 ${activeModal !== null ? "opacity-0" : "opacity-100"}`} style={{ y: useTransform(smoothScroll, [0, 1], ["0%", "10%"]) }} />'
);

fs.writeFileSync('src/App.tsx', code);
