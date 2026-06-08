import { renderHook } from '@testing-library/react-hooks';
import { useNetworkStatus } from '../useNetworkStatus';
import * as NetInfo from '@react-native-community/netinfo';

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
}));

describe('useNetworkStatus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if isConnected is null (initial state)', () => {
    (NetInfo.useNetInfo as jest.Mock).mockReturnValue({
      isConnected: null,
      isInternetReachable: null,
      type: 'unknown',
    });

    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isConnected).toBe(true);
    expect(result.current.isInternetReachable).toBe(null);
    expect(result.current.type).toBe('unknown');
  });

  it('should return false if isConnected is false', () => {
    (NetInfo.useNetInfo as jest.Mock).mockReturnValue({
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    });

    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isInternetReachable).toBe(false);
    expect(result.current.type).toBe('none');
  });

  it('should return true if isConnected is true', () => {
    (NetInfo.useNetInfo as jest.Mock).mockReturnValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });

    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isConnected).toBe(true);
    expect(result.current.isInternetReachable).toBe(true);
    expect(result.current.type).toBe('wifi');
  });
});
