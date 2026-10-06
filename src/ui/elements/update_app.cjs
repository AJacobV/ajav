const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add imports for components
const importBlock = `
import AboutMe from './AboutMe';
import Tech from './Tech';
import Projects from './Projects';
import ContactMe from './ContactMe';
`;
code = code.replace("import { useEffect, useState, useRef } from 'react';", "import { useEffect, useState, useRef } from 'react';\n" + importBlock);


// Remove everything from {/* 2. ABOUT */} down to {/* 6. Projects Modal */} inclusive
const startIndex = code.indexOf('{/* 2. ABOUT */}');
const endIndex = code.lastIndexOf('</main>'); // Or find where the modal ends

// We can just use string replacement for the big chunks, or regex
const regex = /\{\/\* 2\. ABOUT \*\/\}[\s\S]*?(?=\s*<\/main>)/;

const newSections = `
        <AboutMe />
        <Tech />
        <Projects activeModal={activeModal} setActiveModal={setActiveModal} />
        <ContactMe />
`;

code = code.replace(regex, newSections);

fs.writeFileSync('src/App.tsx', code);
