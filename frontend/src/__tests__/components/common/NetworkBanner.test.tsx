import React from 'react';
import { render } from '@testing-library/react-native';

import { useAppSelector } from '@/src/store/hooks';
import { NetworkBanner } from '@/src/components/common/NetworkBanner';


jest.mock('@/src/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useSharedValue: jest.fn((init) => ({ value: init })),
    useAnimatedStyle: jest.fn((cb) => cb()),
    withTiming: jest.fn((val, config, cb) => val),
    withSequence: jest.fn((...args) => args[args.length - 1]),
    withDelay: jest.fn((delay, val) => val),
    runOnJS: jest.fn((fn) => fn),
  };
});

describe('NetworkBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

it('does not render anything when online initially', () => {
  (useAppSelector as jest.Mock).mockReturnValue(true);

  const { queryByText } = render(<NetworkBanner />);
  expect(queryByText('No Internet Connection')).toBeNull();
  expect(queryByText('Back online')).toBeNull();
});

it('renders correctly when the app goes offline', () => {
  (useAppSelector as jest.Mock).mockReturnValue(false);
    const { getByText } = render(<NetworkBanner />);
    expect(getByText('No Internet Connection')).toBeTruthy();
  });

  it('shows "Back online" message when connectivity is restored', () => {
    // Start offline
    (useAppSelector as jest.Mock).mockReturnValue(false);
    const { getByText, rerender } = render(<NetworkBanner />);
    expect(getByText('No Internet Connection')).toBeTruthy();

    // Mock restore connectivity
    (useAppSelector as jest.Mock).mockReturnValue(true);
    rerender(<NetworkBanner />);
    
    expect(getByText('Back online')).toBeTruthy();
  });

  it('handles rapid changes in network status gracefully', () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);
    const { getByText, rerender } = render(<NetworkBanner />);
    
    // Offline
    (useAppSelector as jest.Mock).mockReturnValue(false);
    rerender(<NetworkBanner />);
    expect(getByText('No Internet Connection')).toBeTruthy();
    
    // Online
    (useAppSelector as jest.Mock).mockReturnValue(true);
    rerender(<NetworkBanner />);
    expect(getByText('Back online')).toBeTruthy();
    
    // Offline again rapidly
    (useAppSelector as jest.Mock).mockReturnValue(false);
    rerender(<NetworkBanner />);
    expect(getByText('No Internet Connection')).toBeTruthy();
  });
});
