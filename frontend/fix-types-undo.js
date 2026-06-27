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
  
  let newContent = content.replace(/import type\s*\{\s*TextInput\s*\}\s*from\s*['"]react-native['"]/g, 'import { TextInput } from \'react-native\'')
                         .replace(/import\s*\{\s*([^}]*)type\s*TextInput([^}]*)\}\s*from\s*['"]react-native['"]/g, 'import { $1TextInput$2 } from \'react-native\'')
                         .replace(/import type\s*\{\s*FlatList\s*\}\s*from\s*['"]react-native['"]/g, 'import { FlatList } from \'react-native\'')
                         .replace(/import\s*\{\s*([^}]*)type\s*FlatList([^}]*)\}\s*from\s*['"]react-native['"]/g, 'import { $1FlatList$2 } from \'react-native\'')
                         .replace(/import type\s*\{\s*ScrollView\s*\}\s*from\s*['"]react-native['"]/g, 'import { ScrollView } from \'react-native\'')
                         .replace(/import\s*\{\s*([^}]*)type\s*ScrollView([^}]*)\}\s*from\s*['"]react-native['"]/g, 'import { $1ScrollView$2 } from \'react-native\'');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Reverted ' + file);
  }
});
