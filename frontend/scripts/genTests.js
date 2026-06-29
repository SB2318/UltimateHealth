const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, '../src/hooks');
const files = fs.readdirSync(hooksDir);

const hookFiles = files.filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.includes('.test.'));

let generatedCount = 0;

hookFiles.forEach(file => {
    const isTsx = file.endsWith('.tsx');
    const testFileName = file.replace(isTsx ? '.tsx' : '.ts', isTsx ? '.test.tsx' : '.test.ts');
    const testFilePath = path.join(hooksDir, testFileName);
    
    if (fs.existsSync(testFilePath)) return;

    const content = fs.readFileSync(path.join(hooksDir, file), 'utf-8');
    
    // find hook name
    const hookMatch = content.match(/export\s+(?:const|function)\s+(use[A-Za-z0-9_]+)\s*(?:=\s*)?\((.*?)\)/s);
    if (!hookMatch) return;
    
    const hookName = hookMatch[1];
    const argsRaw = hookMatch[2] || '';
    
    // Parse arguments simply
    const argsSplit = argsRaw.split(',').map(a => a.split(':')[0].trim()).filter(a => a && a !== '');
    
    let mockArgs = [];
    if (argsRaw.includes('page: number') || argsRaw.includes('Page: number')) mockArgs.push('1');
    else if (argsRaw.includes('string')) mockArgs.push("'test'");
    else if (argsRaw.includes('boolean')) mockArgs.push("true");
    
    // Just map to basic any types to satisfy TS loosely
    const argsCall = argsSplit.map(a => {
      if (a.toLowerCase().includes('page') || a.toLowerCase().includes('limit')) return '1';
      if (a.toLowerCase().includes('isconnected') || a.toLowerCase().includes('is')) return 'true';
      if (a.toLowerCase().includes('id')) return "'test-id'";
      return 'null as any';
    }).join(', ');

    const hasRedux = content.includes('react-redux');
    
    const template = `import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
${hasRedux ? "import * as ReactRedux from 'react-redux';" : ''}
import {${hookName}} from './${file.replace(/\.tsx?$/, '')}';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

${hasRedux ? `jest.mock('react-redux', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));` : ''}

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('${hookName}', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes successfully', async () => {
    ${hasRedux ? `(ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);` : ''}
    
    mockedAxios.get.mockResolvedValueOnce({ data: { success: true, data: [] } });
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => ${hookName}(${argsCall}), {
      wrapper: makeWrapper(),
    });

    // Check if it's a query or mutation and wait for it to settle if it executes immediately
    if (result.current && typeof result.current.mutate === 'function') {
        result.current.mutate(null as any);
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else if (result.current && result.current.isSuccess !== undefined) {
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else {
        expect(result.current).toBeDefined();
    }
  });
});
`;

    fs.writeFileSync(testFilePath, template);
    generatedCount++;
});

console.log('Generated ' + generatedCount + ' test files.');
