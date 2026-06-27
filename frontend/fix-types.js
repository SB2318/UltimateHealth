const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
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

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/import\s*\{\s*([^}]*)\bAxiosError\b([^}]*)\}\s*from\s*['"]axios['"]/g, (match, p1, p2) => {
    // If it's the only import, change to import type
    if (p1.trim() === '' && p2.trim() === '') {
      return 'import type { AxiosError } from \'axios\'';
    }
    // If there are others, add type keyword before AxiosError
    return 'import { ' + p1 + ' type AxiosError ' + p2 + '} from \'axios\'';
  });
  
  // also fix TextInput, FlatList, ScrollView namespace errors
  newContent = newContent.replace(/import\s*\{\s*([^}]*)\bTextInput\b([^}]*)\}\s*from\s*['"]react-native['"]/g, (match, p1, p2) => {
    if (p1.trim() === '' && p2.trim() === '') return 'import type { TextInput } from \'react-native\'';
    return 'import { ' + p1 + ' type TextInput ' + p2 + '} from \'react-native\'';
  });
  
  newContent = newContent.replace(/import\s*\{\s*([^}]*)\bFlatList\b([^}]*)\}\s*from\s*['"]react-native['"]/g, (match, p1, p2) => {
    if (p1.trim() === '' && p2.trim() === '') return 'import type { FlatList } from \'react-native\'';
    return 'import { ' + p1 + ' type FlatList ' + p2 + '} from \'react-native\'';
  });

  newContent = newContent.replace(/import\s*\{\s*([^}]*)\bScrollView\b([^}]*)\}\s*from\s*['"]react-native['"]/g, (match, p1, p2) => {
    if (p1.trim() === '' && p2.trim() === '') return 'import type { ScrollView } from \'react-native\'';
    return 'import { ' + p1 + ' type ScrollView ' + p2 + '} from \'react-native\'';
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed ' + file);
  }
});
