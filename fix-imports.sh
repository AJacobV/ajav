sed -i '' 's/import { motion, AnimatePresence }/import { motion }/' src/App.tsx
sed -i '' 's/import { Terminal, Github, Linkedin, Mail, ArrowRight } from "lucide-react";/import { Terminal, Mail, ArrowRight } from "lucide-react";/' src/App.tsx
sed -i '' 's/<Github size={24} \/>/GITHUB/g' src/App.tsx
sed -i '' 's/<Linkedin size={24} \/>/LINKEDIN/g' src/App.tsx
