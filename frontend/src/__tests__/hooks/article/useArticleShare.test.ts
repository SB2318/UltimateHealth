import {renderHook} from '@testing-library/react-native';
import {useArticleShare} from '../../../hooks/article/useArticleShare';
import React from 'react';

jest.mock('react-native', () => ({
  Share: { share: jest.fn() },
  Platform: { OS: 'ios' },
  Alert: { alert: jest.fn() },
  View: 'View'
}));

jest.mock('react-native-view-shot', () => ({
  captureRef: jest.fn().mockResolvedValue('file://test.png')
}));

describe('useArticleShare', () => {
  it('renders correctly', () => {
    const {result} = renderHook(() => useArticleShare());
    expect(result.current.isCapturing).toBe(false);
    expect(typeof result.current.shareArticleCard).toBe('function');
  });
});
