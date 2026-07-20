import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { useGetTotalWrites } from '../useGetTotalWrites';
import { useSelector } from 'react-redux';

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock react-redux so we can control the isGuest selector per test
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
const mockedUseSelector = useSelector as jest.Mock;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useGetTotalWrites', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── 1. Hook initialisation & query state ────────────────────────────────

  it('should initialise in loading state when enabled', async () => {
    mockedUseSelector.mockReturnValue(false); // not a guest

    const mockData = { totalWrites: 5, progress: 50 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-1',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    // Initial state before query resolves
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // ── 2. Successful query execution ────────────────────────────────────────

  it('should fetch total writes data successfully for own user', async () => {
    mockedUseSelector.mockReturnValue(false); // not a guest

    const mockData = { totalWrites: 12, progress: 75 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-1',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.data?.totalWrites).toBe(12);
    expect(result.current.data?.progress).toBe(75);
  });

  // ── 3. Returned data shape validation ───────────────────────────────────

  it('should return data matching the WriteStatus shape', async () => {
    mockedUseSelector.mockReturnValue(false);

    const mockData = { totalWrites: 3, progress: 30 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-abc',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(typeof result.current.data?.totalWrites).toBe('number');
    expect(typeof result.current.data?.progress).toBe('number');
  });

  // ── 4. "others" mode – fetches by userId instead of user_id ─────────────

  it('should use userId in the URL when others=true', async () => {
    mockedUseSelector.mockReturnValue(false);

    const mockData = { totalWrites: 8, progress: 60 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'own-user',
          userId: 'other-user',
          others: true,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify the GET was called with the other user's ID in the URL
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('other-user'),
    );
  });

  it('should use user_id in the URL when others=false', async () => {
    mockedUseSelector.mockReturnValue(false);

    const mockData = { totalWrites: 4, progress: 40 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'own-user',
          others: false,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('own-user'),
    );
  });

  // ── 5. Conditional execution – not connected ─────────────────────────────

  it('should NOT execute the query when isConnected=false', () => {
    mockedUseSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-1',
          isConnected: false,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 6. Conditional execution – guest user ───────────────────────────────

  it('should NOT execute the query when the user is a guest', () => {
    mockedUseSelector.mockReturnValue(true); // isGuest = true

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-1',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 7. Conditional execution – missing user_id ───────────────────────────

  it('should NOT execute the query when user_id is empty', () => {
    mockedUseSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: '',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 8. Conditional execution – others=true but userId missing ────────────

  it('should NOT execute the query when others=true but userId is absent', () => {
    mockedUseSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'own-user',
          others: true,
          userId: undefined,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 9. Error handling ────────────────────────────────────────────────────

  it('should transition to error state when the request fails', async () => {
    mockedUseSelector.mockReturnValue(false);

    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(
      () =>
        useGetTotalWrites({
          user_id: 'user-1',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });
});
