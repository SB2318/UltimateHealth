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

describe('WellnessDashboardScreen - Manual Log Form', () => {
  const mockMutate = jest.fn();
  const mockLog = {
    userId: 'u1',
    date: '2026-08-07',
    metrics: { steps: 8450, sleepHours: 7.5, waterMl: 1800, activeMinutes: 45 },
  };

  const mockLogState = (overrides: any = {}) => ({
    mutate: mockMutate,
    isSuccess: false,
    isError: false,
    error: null,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useGetWeeklyWellness.mockReset();
    useLogWellness.mockReset();
    mockSelector.mockReturnValue({ isConnected: true });
    useGetWeeklyWellness.mockReturnValue({ data: [mockLog], isLoading: false, isError: false, refetch: jest.fn() });
    useLogWellness.mockReturnValue(mockLogState());
  });

  it('submits valid metrics to the log mutation and shows success + clears inputs', () => {
    const { getByTestId, rerender } = render(<WellnessDashboardScreen />);

    fireEvent.changeText(getByTestId('log-steps'), '8000');
    fireEvent.changeText(getByTestId('log-water'), '2000');
    fireEvent.changeText(getByTestId('log-sleep'), '7.5');
    fireEvent.changeText(getByTestId('log-breathing'), '10');
    fireEvent.press(getByTestId('log-submit'));

    // validated payload (D-05): date today, metrics coerced to numbers
    expect(mockMutate).toHaveBeenCalledWith({
      date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      metrics: { steps: 8000, waterMl: 2000, sleepHours: 7.5, breathingSessionMinutes: 10 },
    });

    // simulate the resolved mutation: success message shows, inputs clear (D-06)
    useLogWellness.mockReturnValue(mockLogState({ isSuccess: true }));
    rerender(<WellnessDashboardScreen />);

    expect(getByTestId('log-success')).toBeTruthy();
    expect(getByTestId('log-steps').props.value).toBe('');
    expect(getByTestId('log-water').props.value).toBe('');
  });

  it('blocks invalid input with an inline error and does not call the mutation', () => {
    const { getByTestId, getByText } = render(<WellnessDashboardScreen />);

    fireEvent.changeText(getByTestId('log-steps'), '-5');
    fireEvent.press(getByTestId('log-submit'));

    // zod v4 default .min(0) message, prefixed by the field name
    // (zod 4.4.3 emits "Too small: expected number to be >=0" — the plan's
    // "Number must be greater than or equal to 0" is the zod v3 wording)
    expect(getByText(/expected number to be >=0/)).toBeTruthy();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('shows an error message when the mutation fails without crashing', () => {
    const { getByTestId, rerender } = render(<WellnessDashboardScreen />);

    fireEvent.changeText(getByTestId('log-steps'), '8000');
    fireEvent.press(getByTestId('log-submit'));

    // simulate the rejected mutation
    useLogWellness.mockReturnValue(
      mockLogState({ isError: true, error: new Error('Network request failed') })
    );
    rerender(<WellnessDashboardScreen />);

    expect(getByTestId('log-failed')).toBeTruthy();
    expect(getByTestId('log-failed').props.children).toContain('Failed to save log. Please try again.');
  });
});
