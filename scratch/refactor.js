const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../frontend/src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const metricImport = `import { rf } from '../helper/Metric';\n`;

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Replace fontSize: 16 with fontSize: rf(16)
  content = content.replace(/fontSize:\s*(\d+)(?!,?\s*rf)/g, 'fontSize: rf($1)');
  
  // 2. Replace fontSize={16} with fontSize={rf(16)}
  content = content.replace(/fontSize=\{(\d+)\}/g, 'fontSize={rf($1)}');

  // 3. Update TouchableOpacity/Pressable to have minHeight/minWidth 44
  // We can add a simple wrapper or inline style, but it's complex to parse JSX accurately.
  // We will instead look for style={styles.xyz} inside TouchableOpacity and just append.
  // Actually, let's skip automated Touchable style injection and do it manually for the core screens to prevent massive breakages.

  // 4. Change specific fixed heights to minHeight if they contain Text.
  // Too risky to automate globally without AST.

  if (content !== originalContent) {
    // Need to ensure rf is imported if not already.
    if (!content.includes('import { rf }') && !content.includes('import {rf}')) {
      // Find relative path to helper/Metric.ts
      const relPath = path.relative(path.dirname(filePath), path.join(srcDir, 'helper/Metric')).replace(/\\/g, '/');
      const importStatement = `import { rf } from '${relPath}';\n`;
      
      // Insert after the last import
      const importMatches = [...content.matchAll(/^import .*;?$/gm)];
      if (importMatches.length > 0) {
        const lastImport = importMatches[importMatches.length - 1];
        const insertIndex = lastImport.index + lastImport[0].length + 1;
        content = content.slice(0, insertIndex) + importStatement + content.slice(insertIndex);
      } else {
        content = importStatement + content;
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir(srcDir, processFile);
console.log("Done.");
