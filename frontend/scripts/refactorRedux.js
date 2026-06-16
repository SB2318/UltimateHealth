const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const hooksFile = path.join(__dirname, '../src/hooks/reduxHooks.ts');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
let updatedCount = 0;

files.forEach(file => {
  if (file === hooksFile) return;

  let content = fs.readFileSync(file, 'utf8');
  
  // Check if file has useSelector((state: any)
  if (content.includes('useSelector((state: any)')) {
    // 1. Replace the usage
    let newContent = content.replace(/useSelector\(\s*\(\s*state\s*:\s*any\s*\)/g, 'useAppSelector((state');
    
    // 2. Add import for useAppSelector
    const relativePathToHooks = path.relative(path.dirname(file), hooksFile).replace(/\\/g, '/').replace('.ts', '');
    const importPath = relativePathToHooks.startsWith('.') ? relativePathToHooks : `./${relativePathToHooks}`;
    const importStatement = `import { useAppSelector } from '${importPath}';\n`;
    
    // Find where imports are
    const importMatches = [...newContent.matchAll(/^import.*from.*;$/gm)];
    if (importMatches.length > 0) {
      const lastImportMatch = importMatches[importMatches.length - 1];
      const insertPos = lastImportMatch.index + lastImportMatch[0].length + 1;
      newContent = newContent.slice(0, insertPos) + importStatement + newContent.slice(insertPos);
    } else {
      newContent = importStatement + newContent;
    }

    // 3. Optional: remove useSelector from react-redux import
    // This is simple but might leave empty imports like `import { } from 'react-redux';`
    newContent = newContent.replace(/import\s*{\s*useSelector\s*}\s*from\s*['"]react-redux['"];?/g, '');
    newContent = newContent.replace(/useSelector\s*,\s*/g, '');
    newContent = newContent.replace(/,\s*useSelector/g, '');

    fs.writeFileSync(file, newContent, 'utf8');
    updatedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Successfully updated ${updatedCount} files.`);
