const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/components/Navbar.jsx',
  'src/components/EventCard.jsx',
  'src/components/ChatBox.jsx',
  'src/components/SkeletonCard.jsx',
  'src/pages/Home.jsx',
  'src/pages/EventPage.jsx'
];

filesToProcess.forEach(file => {
  const p = path.join('d:/event_platform/live-event-platform', file);
  let content = fs.readFileSync(p, 'utf-8');

  // Backgrounds
  content = content.replace(/\bbg-gray-950\b/g, 'bg-slate-50 dark:bg-gray-950');
  content = content.replace(/\bbg-gray-900\b/g, 'bg-white dark:bg-gray-900');
  content = content.replace(/\bbg-gray-800\b/g, 'bg-slate-100 dark:bg-gray-800');
  
  // Texts
  content = content.replace(/\btext-white\b/g, 'text-slate-900 dark:text-white');
  content = content.replace(/\btext-gray-400\b/g, 'text-slate-600 dark:text-gray-400');
  content = content.replace(/\btext-gray-500\b/g, 'text-slate-500 dark:text-gray-500');
  content = content.replace(/\btext-gray-600\b/g, 'text-slate-400 dark:text-gray-600');
  content = content.replace(/\btext-gray-700\b/g, 'text-slate-300 dark:text-gray-700');
  content = content.replace(/\btext-gray-200\b/g, 'text-slate-700 dark:text-gray-200');
  content = content.replace(/\btext-gray-300\b/g, 'text-slate-600 dark:text-gray-300');
  
  // Borders
  content = content.replace(/\bborder-white\/5\b/g, 'border-slate-200 dark:border-white/5');
  content = content.replace(/\bborder-white\/10\b/g, 'border-slate-300 dark:border-white/10');
  content = content.replace(/\bborder-white\/20\b/g, 'border-slate-300 dark:border-white/20');
  
  // Hover Backgrounds
  content = content.replace(/\bhover:bg-white\/5\b/g, 'hover:bg-slate-100 dark:hover:bg-white/5');
  content = content.replace(/\bhover:bg-white\/10\b/g, 'hover:bg-slate-200 dark:hover:bg-white/10');
  content = content.replace(/\bbg-white\/5\b/g, 'bg-slate-100 dark:bg-white/5');
  
  // Exceptions or manual fixes for text-white in gradient buttons
  if(file.includes('Navbar.jsx')) {
    // Navbar specific:
    // Drop shadow on streamora logo
    content = content.replace('text-slate-900 dark:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]', 'text-slate-900 dark:text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]');
    // Button white text fix (it has bg-gradient)
    content = content.replace('font-medium text-slate-900 dark:text-white bg-gradient-to-r', 'font-medium text-white bg-gradient-to-r');
    
    // Changing the navbar's scrolled color for better light mode
    content = content.replace('bg-slate-50 dark:bg-gray-950/90 backdrop-blur-xl', 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl');
  }

  if (file.includes('EventCard.jsx') || file.includes('EventPage.jsx') || file.includes('Home.jsx')) {
     // Buttons in light mode should stay white
     content = content.replace('text-slate-900 dark:text-white transition-all duration-200 shadow-lg', 'text-white transition-all duration-200 shadow-lg');
     content = content.replace('text-slate-900 dark:text-white shadow-lg shadow-violet-900', 'text-white shadow-lg shadow-violet-900');
     content = content.replace('text-slate-900 dark:text-white font-semibold\n        >', 'text-white font-semibold\n        >');
     content = content.replace('text-slate-900 dark:text-white font-semibold\n              bg-gradient-to-r', 'text-white font-semibold\n              bg-gradient-to-r');
     content = content.replace('text-sm font-semibold text-slate-900 dark:text-white hover:from-violet-500', 'text-sm font-semibold text-white hover:from-violet-500');
  }
  
  if (file.includes('ChatBox.jsx')) {
  	 content = content.replace('bg-gradient-to-r from-violet-600 to-cyan-600 text-slate-900 dark:text-white', 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white');
  	 content = content.replace('text-slate-900 dark:text-white hover:from-violet-500 hover:to-cyan-500', 'text-white hover:from-violet-500 hover:to-cyan-500');
  	 content = content.replace('font-bold text-slate-900 dark:text-white', 'font-bold text-white');
  	 content = content.replace('bg-gray-900/80', 'bg-slate-50/80 dark:bg-gray-900/80');
  	 content = content.replace('bg-gray-900/90', 'bg-slate-50/90 dark:bg-gray-900/90');
  }

  // Save it back
  fs.writeFileSync(p, content, 'utf-8');
});

// Update tailwind config
let twConfig = fs.readFileSync('d:/event_platform/live-event-platform/tailwind.config.js', 'utf-8');
if (!twConfig.includes('darkMode:')) {
  twConfig = twConfig.replace('export default {', 'export default {\n  darkMode: "class",');
  fs.writeFileSync('d:/event_platform/live-event-platform/tailwind.config.js', twConfig, 'utf-8');
}
console.log('✅ Done replacing themes');
