import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { useGetAuthorMonthlyWriteReport } from '../useGetMonthlyWriteReport';

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
  useAppSelector: jest.fn(),
}));
import { useAppSelector } from 'react-redux';
const mockeduseAppSelector = useAppSelector as jest.Mock;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useGetAuthorMonthlyWriteReport', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── 1. Hook initialisation & query state ────────────────────────────────

  it('should initialise in loading state when enabled', async () => {
    mockeduseAppSelector.mockReturnValue(false); // not a guest

    const mockData = [
      { date: '2024-01-01', value: 3 },
      { date: '2024-01-15', value: 5 },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 1,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // ── 2. Successful query execution ────────────────────────────────────────

  it('should fetch monthly write report data successfully', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [
      { date: '2024-03-05', value: 2 },
      { date: '2024-03-20', value: 7 },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 3,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.data).toHaveLength(2);
  });

  // ── 3. Returned data shape validation ───────────────────────────────────

  it('should return data matching the MonthStatus[] shape', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [{ date: '2024-05-10', value: 4 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-abc',
          selectedMonth: 5,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const item = result.current.data?.[0];
    expect(typeof item?.date).toBe('string');
    expect(typeof item?.value).toBe('number');
  });

  // ── 4. Handling invalid month selection (selectedMonth === -1) ───────────

  it('should return an empty array when selectedMonth is -1', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    // axios.get should not be called at all when selectedMonth === -1
    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: -1,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 5. "others" mode – fetches by userId instead of user_id ─────────────

  it('should include userId in the URL when others=true', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [{ date: '2024-06-01', value: 1 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'own-user',
          userId: 'other-user',
          others: true,
          selectedMonth: 6,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('other-user'),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('month=6'),
    );
  });

  it('should include user_id in the URL when others=false', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [{ date: '2024-07-15', value: 9 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'own-user',
          others: false,
          selectedMonth: 7,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('own-user'),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('month=7'),
    );
  });

  // ── 6. Conditional execution – not connected ─────────────────────────────

  it('should NOT execute the query when isConnected=false', () => {
    mockeduseAppSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 4,
          isConnected: false,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 7. Conditional execution – guest user ───────────────────────────────

  it('should NOT execute the query when the user is a guest', () => {
    mockeduseAppSelector.mockReturnValue(true); // isGuest = true

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 4,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 8. Conditional execution – missing user_id ───────────────────────────

  it('should NOT execute the query when user_id is empty', () => {
    mockeduseAppSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: '',
          selectedMonth: 4,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 9. Conditional execution – others=true but userId missing ────────────

  it('should NOT execute the query when others=true but userId is absent', () => {
    mockeduseAppSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'own-user',
          others: true,
          userId: undefined,
          selectedMonth: 4,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  // ── 10. Error handling ───────────────────────────────────────────────────

  it('should transition to error state when the request fails', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 2,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });

  // ── 11. Returns an empty array for server response with no data ──────────

  it('should return empty array when server responds with empty monthlyWrites', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    mockedAxios.get.mockResolvedValueOnce({ data: { monthlyWrites: [] } });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'user-1',
          selectedMonth: 8,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });
});
