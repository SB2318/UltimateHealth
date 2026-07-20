import React from 'react';
import { render } from '@testing-library/react-native';
import ContentListScreen from '@/src/screens/article/ContentListScreen';


jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({ isConnected: true })),
  useDispatch: () => jest.fn(),
}));

jest.mock('tamagui', () => ({
  useTheme: () => ({ background: { val: '#ffffff' } }),
}));

jest.mock('../../hooks/useGetProfile', () => ({
  useGetProfile: () => ({
    data: { articles: [], repostArticles: [], savedArticles: [] },
    refetch: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useNavigation: () => ({ navigate: jest.fn(), addListener: jest.fn() }),
}));

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  CachesDirectoryPath: '/tmp',
  writeFile: jest.fn(),
}));

jest.mock('react-native-html-to-pdf', () => ({
  convert: jest.fn(),
}));

jest.mock('react-native-snackbar', () => ({
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
  show: jest.fn(),
}));

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    default: View,
    WebView: View,
  };
});

describe('ContentListScreen', () => {
  it('renders tabs correctly', () => {
    const mockRoute = { params: { type: 'articles' } };
    const { getByText } = render(<ContentListScreen navigation={{} as any} route={mockRoute as any} />);
    expect(getByText('Posts')).toBeTruthy();
    expect(getByText('Reposts')).toBeTruthy();
    expect(getByText('Saved')).toBeTruthy();
  });
});
