import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useDyslexiaMode, DYSLEXIA_MODE_KEY } from '../useDyslexiaMode';
import { retrieveItem, storeItem } from '../../helper/Utils';

// Mock the Utils
jest.mock('../../helper/Utils', () => ({
  retrieveItem: jest.fn(),
  storeItem: jest.fn(() => Promise.resolve()),
}));

describe('useDyslexiaMode hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with false if nothing is in storage', async () => {
    (retrieveItem as unknown as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useDyslexiaMode());

    expect(result.current.isDyslexiaMode).toBe(false);
    expect(retrieveItem).toHaveBeenCalledWith(DYSLEXIA_MODE_KEY);
  });

  it('should initialize with true if "true" is in storage', async () => {
    (retrieveItem as unknown as jest.Mock).mockResolvedValueOnce('true');

    const { result } = renderHook(() => useDyslexiaMode());

    // Wait for the async useEffect to finish
    await waitFor(() => {
      expect(result.current.isDyslexiaMode).toBe(true);
    });
    
    expect(retrieveItem).toHaveBeenCalledWith(DYSLEXIA_MODE_KEY);
  });

  it('should toggle state and call storeItem', async () => {
    (retrieveItem as unknown as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useDyslexiaMode());

    // Wait for initial load
    await waitFor(() => expect(result.current.isDyslexiaMode).toBe(false));

    // Act
    act(() => {
      result.current.toggleDyslexiaMode();
    });

    // Assert state changed
    expect(result.current.isDyslexiaMode).toBe(true);
    
    // Assert storage updated
    expect(storeItem).toHaveBeenCalledWith(DYSLEXIA_MODE_KEY, 'true');

    // Toggle again
    act(() => {
      result.current.toggleDyslexiaMode();
    });

    expect(result.current.isDyslexiaMode).toBe(false);
    expect(storeItem).toHaveBeenCalledWith(DYSLEXIA_MODE_KEY, 'false');
  });

  it('should revert state if storeItem fails (optimistic update fallback)', async () => {
    (retrieveItem as unknown as jest.Mock).mockResolvedValueOnce(null);
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock storeItem to reject
    (storeItem as unknown as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

    const { result } = renderHook(() => useDyslexiaMode());

    await waitFor(() => expect(result.current.isDyslexiaMode).toBe(false));

    // Act
    await act(async () => {
      await result.current.toggleDyslexiaMode();
    });

    // Assert state reverted
    expect(result.current.isDyslexiaMode).toBe(false);
    expect(mockConsoleError).toHaveBeenCalledWith('Failed to save dyslexia mode preference:', expect.any(Error));

    mockConsoleError.mockRestore();
  });
});
