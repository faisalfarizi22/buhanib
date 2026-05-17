const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

const replacements = [
  { regex: /#F5F4F0/gi, replace: '#F8F9FB' },
  { regex: /#111111/gi, replace: '#0F172A' },
  { regex: /text-\[#111\]/g, replace: 'text-[#0F172A]' },
  { regex: /bg-\[#111\]/g, replace: 'bg-[#0A1A3A]' },
  { regex: /border-\[#111\]/g, replace: 'border-[#0A1A3A]' },
  { regex: /#C9A84C/gi, replace: '#D4AF37' },
  { regex: /#002B5B/gi, replace: '#0A1A3A' },
  { regex: /#C5A04D/gi, replace: '#D4AF37' },
  // And standalone "#111" that might be used in styles or other places
  { regex: /'#111'/g, replace: "'#0F172A'" },
  { regex: /"#111"/g, replace: '"#0F172A"' },
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir(directory);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(({ regex, replace }) => {
    content = content.replace(regex, replace);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
