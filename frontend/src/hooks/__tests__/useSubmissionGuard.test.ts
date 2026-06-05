import {act, renderHook} from '@testing-library/react-native';

import {useSubmissionGuard} from '../useSubmissionGuard';

describe('useSubmissionGuard', () => {
  it('blocks repeated acquire calls until released', () => {
    const {result} = renderHook(() => useSubmissionGuard());

    act(() => {
      expect(result.current.acquire()).toBe(true);
    });

    expect(result.current.isGuarded).toBe(true);

    act(() => {
      expect(result.current.acquire()).toBe(false);
    });

    act(() => {
      result.current.release();
    });

    expect(result.current.isGuarded).toBe(false);

    act(() => {
      expect(result.current.acquire()).toBe(true);
    });
  });

  it('does not acquire when an external mutation is pending', () => {
    const {result} = renderHook(() => useSubmissionGuard(true));

    act(() => {
      expect(result.current.acquire()).toBe(false);
    });

    expect(result.current.isGuarded).toBe(true);
  });
});
