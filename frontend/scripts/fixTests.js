const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, '../src/hooks');

const updates = {
  'useArticleRoom.test.ts': {
      replaceArgs: "('a1', 'p1')",
      hookName: 'useArticleRoom'
  },
  'useGetUserAllImprovements.test.ts': {
      replaceArgs: "({ page: 1, selectedStatus: 1, visit: 1, setVisit: jest.fn(), setTotalPages: jest.fn(), setImprovementData: jest.fn(), setPublishedLabel: jest.fn(), setProgressLabel: jest.fn(), setDiscardLabel: jest.fn() })",
      hookName: 'useGetAllImprovementsForReview'
  },
  'useGetTotalWrites.test.ts': {
      replaceArgs: "({ user_id: '1', isConnected: true })",
      hookName: 'useGetTotalWrites'
  },
  'useGetMonthlyReadReport.test.ts': {
      replaceArgs: "({ user_id: '1', selectedMonth: 1, isConnected: true })",
      hookName: 'useGetAuthorMonthlyReadReport'
  },
  'useGetTotalLikeViewStatus.test.ts': {
      replaceArgs: "({ user_id: '1', isConnected: true })",
      hookName: 'useGetTotalLikeViewStatus'
  },
  'useGetYearlyReadReport.test.ts': {
      replaceArgs: "({ user_id: '1', selectedYear: 2024, isConnected: true })",
      hookName: 'useGetAuthorYearlyReadReport'
  },
  'useGetYearlyWriteReport.test.ts': {
      replaceArgs: "({ user_id: '1', selectedYear: 2024, isConnected: true })",
      hookName: 'useGetAuthorYearlyWriteReport'
  },
  'useGetImprovementContent.test.ts': {
      replaceArgs: "('1', true)",
      hookName: 'useGetImprovementContent'
  },
  'useGetMonthlyWriteReport.test.ts': {
      replaceArgs: "({ user_id: '1', selectedMonth: 1, isConnected: true })",
      hookName: 'useGetAuthorMonthlyWriteReport'
  },
  'useCheckUserHandleAvailability.test.ts': {
      replaceArgs: "('handle', true)",
      hookName: 'useCheckUserHandleAvailability'
  },
  'useGetTotalReads.test.ts': {
      replaceArgs: "({ user_id: '1', isConnected: true })",
      hookName: 'useGetTotalReads'
  },
  'useGetUserSocialCircle.test.ts': {
      replaceArgs: "({ type: 'follower', articleId: '1', social_user_id: '1', page: 1, isConnected: true })",
      hookName: 'useGetUserSocials'
  },
  'useGetUserAllArticles.test.ts': {
      replaceArgs: "({ page: 1, selectedStatus: 1, visit: 1, setVisit: jest.fn(), setTotalPages: jest.fn(), setArticleData: jest.fn(), setPublishedLabel: jest.fn(), setProgressLabel: jest.fn(), setDiscardLabel: jest.fn() })",
      hookName: 'useGetAllArticlesForUser'
  },
  'useGetMostViewedArticle.test.ts': {
      replaceArgs: "({ user_id: '1', isConnected: true })",
      hookName: 'useGetAuthorMostViewedArticles'
  }
};

Object.entries(updates).forEach(([file, {replaceArgs, hookName}]) => {
  const filePath = path.join(hooksDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // replace imports if hook name is different
  content = content.replace(/import \{.*?\} from '\.\/(.*?)';/, `import {${hookName}} from './$1';`);
  
  // replace describe block if hook name is different
  content = content.replace(/describe\('.*?',/, `describe('${hookName}',`);
  
  // replace the renderHook call
  content = content.replace(/renderHook\(\(\) => .*?\(/, `renderHook(() => ${hookName}${replaceArgs.startsWith('(') ? replaceArgs.substring(0, 1) : '('}`);
  // Actually a simpler way: just replace the entire renderHook line and argument list
  content = content.replace(/renderHook\(\(\) => [a-zA-Z0-9_]+\(.*\), \{/, `renderHook(() => ${hookName}${replaceArgs}, {`);

  fs.writeFileSync(filePath, content);
});

console.log('Fixed tests.');
