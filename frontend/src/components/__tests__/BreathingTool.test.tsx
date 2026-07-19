import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import BreathingTool from '../BreathingTool';
import authAxios from '../../helper/authAxios';

// Mock the API helper
jest.mock('../../helper/authAxios', () => ({
  post: jest.fn(),
}));

describe('BreathingTool Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly with default state', () => {
    const { getByText, getByLabelText } = render(<BreathingTool />);
    
    // Check initial renders
    expect(getByText('🧘 Guided Breathing')).toBeTruthy();
    expect(getByText('4-7-8')).toBeTruthy();
    expect(getByText('Box')).toBeTruthy();
    expect(getByText('Inhale')).toBeTruthy();
    expect(getByText('4s')).toBeTruthy(); // Initial phase duration
    expect(getByLabelText('Start breathing session')).toBeTruthy();
  });

  it('handles start, pause, resume, and stop correctly', () => {
    const { getByLabelText, getByText, queryByLabelText } = render(<BreathingTool />);

    // Start
    fireEvent.press(getByLabelText('Start breathing session'));
    expect(queryByLabelText('Start breathing session')).toBeNull();
    expect(getByLabelText('Pause breathing session')).toBeTruthy();
    expect(getByLabelText('Stop breathing session')).toBeTruthy();

    // Advance timer by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getByText('2s')).toBeTruthy(); // 4 - 2 = 2s remaining

    // Pause
    fireEvent.press(getByLabelText('Pause breathing session'));
    expect(getByLabelText('Resume breathing session')).toBeTruthy();

    // Advance timer while paused (should not change)
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getByText('2s')).toBeTruthy();

    // Resume
    fireEvent.press(getByLabelText('Resume breathing session'));
    
    // Stop
    fireEvent.press(getByLabelText('Stop breathing session'));
    expect(getByLabelText('Start breathing session')).toBeTruthy();
    expect(getByText('4s')).toBeTruthy(); // Resets to start
  });

  it('transitions phases and cycles correctly', () => {
    const { getByLabelText, getByText } = render(<BreathingTool defaultCycles={2} />);
    
    // Start session
    fireEvent.press(getByLabelText('Start breathing session'));
    expect(getByText('Inhale')).toBeTruthy();
    expect(getByText('4s')).toBeTruthy();

    // Advance past Inhale (4s)
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(getByText('Hold')).toBeTruthy();
    expect(getByText('7s')).toBeTruthy();

    // Advance past Hold (7s)
    act(() => {
      jest.advanceTimersByTime(7000);
    });
    expect(getByText('Exhale')).toBeTruthy();
    expect(getByText('8s')).toBeTruthy();

    // Advance past Exhale (8s) - Cycle 1 complete!
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    
    // Should reset to Inhale for cycle 2
    expect(getByText('Inhale')).toBeTruthy();
    expect(getByText('Cycle 2 / 2')).toBeTruthy();

    // Advance through Cycle 2 (19s total)
    act(() => {
      jest.advanceTimersByTime(19000);
    });

    // Should complete the session
    expect(getByText('🎉 Session Complete!')).toBeTruthy();
  });

  it('logs data correctly for completed sessions', async () => {
    const { getByLabelText } = render(<BreathingTool defaultCycles={1} />);
    
    fireEvent.press(getByLabelText('Start breathing session'));
    
    // Complete 1 cycle of 4-7-8 (19 seconds)
    act(() => {
      jest.advanceTimersByTime(19000);
    });

    // Session is 19 seconds + 1 final tick (20 seconds total) -> Ceil to 1 min
    await waitFor(() => {
      expect(authAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        { breathingSessionMinutes: 1 }
      );
    });
  });

  it('logs data correctly when stopped manually', async () => {
    const { getByLabelText } = render(<BreathingTool />);
    
    fireEvent.press(getByLabelText('Start breathing session'));
    
    // Run for 65 seconds
    act(() => {
      jest.advanceTimersByTime(65000);
    });

    fireEvent.press(getByLabelText('Stop breathing session'));

    // 65 seconds -> Ceil to 2 mins
    await waitFor(() => {
      expect(authAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        { breathingSessionMinutes: 2 }
      );
    });
  });

  it('does not log data for 0 second sessions', async () => {
    const { getByLabelText } = render(<BreathingTool />);
    
    fireEvent.press(getByLabelText('Start breathing session'));
    
    // Stop immediately
    fireEvent.press(getByLabelText('Stop breathing session'));

    await waitFor(() => {
      expect(authAxios.post).not.toHaveBeenCalled();
    });
  });
});
