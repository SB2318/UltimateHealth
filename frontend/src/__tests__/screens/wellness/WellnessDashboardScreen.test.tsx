// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WellnessDashboardScreen from '../../../screens/wellness/WellnessDashboardScreen';

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
}));

const mockSelector = jest.fn();
jest.mock('@/src/store/hooks', () => ({
  useAppSelector: (selectorFn: any) => mockSelector(selectorFn),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

// mock the wellness hooks
jest.mock('../../../hooks/wellness/useGetWeeklyWellness', () => ({
  useGetWeeklyWellness: jest.fn(),
}));
const { useGetWeeklyWellness } = require('../../../hooks/wellness/useGetWeeklyWellness');

jest.mock('../../../hooks/wellness/useLogWellness', () => ({
  useLogWellness: jest.fn(),
}));
const { useLogWellness } = require('../../../hooks/wellness/useLogWellness');

// mock the chart lib to avoid SVG/canvas issues in jest
jest.mock('react-native-chart-kit', () => ({ LineChart: () => null }));

jest.mock('@react-navigation/bottom-tabs', () => ({ useBottomTabBarHeight: () => 60 }));

describe('WellnessDashboardScreen - State Rendering Tests', () => {
  const mockRefetch = jest.fn();

  const mockLog = {
    userId: 'u1',
    date: require('../../../lib/utils/wellnessUtils').getTodayDateString(),
    metrics: { steps: 8450, sleepHours: 7.5, waterMl: 1800, activeMinutes: 45 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useGetWeeklyWellness.mockReset();
    useLogWellness.mockReset();
    useLogWellness.mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false,
      isError: false,
      error: null,
    });
    mockSelector.mockReturnValue({ isConnected: true });
  });

  it('renders loading indicator while the weekly query is fetching', () => {
    useGetWeeklyWellness.mockReturnValue({ data: [], isLoading: true, isError: false, refetch: jest.fn() });

    const { getByTestId } = render(<WellnessDashboardScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state with retry action when the fetch fails', () => {
    useGetWeeklyWellness.mockReturnValue({ data: [], isLoading: false, isError: true, refetch: mockRefetch });

    const { getByText } = render(<WellnessDashboardScreen />);

    expect(getByText('Unable to load wellness data')).toBeTruthy();
    fireEvent.press(getByText('Retry'));
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('renders empty state when there is no wellness data yet', () => {
    useGetWeeklyWellness.mockReturnValue({ data: [], isLoading: false, isError: false, refetch: jest.fn() });

    const { getByText } = render(<WellnessDashboardScreen />);

    expect(getByText('No wellness data yet')).toBeTruthy();
  });

  it('renders data-driven dashboard when weekly logs exist', () => {
    useGetWeeklyWellness.mockReturnValue({ data: [mockLog], isLoading: false, isError: false, refetch: jest.fn() });

    const { getByText, getAllByText } = render(<WellnessDashboardScreen />);

    // 'Steps' appears twice: the metric card label and the log form label
    expect(getAllByText('Steps').length).toBeGreaterThanOrEqual(1);
    expect(getByText('8,450')).toBeTruthy();
    expect(getByText('Active Minutes')).toBeTruthy();
    expect(getByText('Weekly Trend')).toBeTruthy();
  });
});
