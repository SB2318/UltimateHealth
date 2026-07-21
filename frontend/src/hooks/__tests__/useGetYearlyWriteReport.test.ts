import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { useAppSelector } from '@/src/store/hooks';
import { useGetAuthorYearlyWriteReport } from '../analytics/useGetYearlyWriteReport';


// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('axios');
const mockedAxios = axios as unknown as jest.Mocked<typeof axios>;

jest.mock('../../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

const mockeduseAppSelector = useAppSelector as unknown as jest.Mock;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useGetAuthorYearlyWriteReport', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── 1. Hook initialisation & query state ────────────────────────────────

  it('should initialise in loading state when enabled', async () => {
    mockeduseAppSelector.mockReturnValue(false); // not a guest

    const mockData = [
      { month: 'Jan', value: 5 },
      { month: 'Feb', value: 3 },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // ── 2. Successful query execution ────────────────────────────────────────

  it('should fetch yearly write report data successfully', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [
      { month: 'Mar', value: 6 },
      { month: 'Apr', value: 9 },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.data).toHaveLength(2);
  });

  // ── 3. Returned data shape validation ───────────────────────────────────

  it('should return data matching the YearStatus[] shape', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [{ month: 'Jun', value: 11 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-abc',
          selectedYear: 2023,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const item = result.current.data?.[0];
    expect(typeof item?.month).toBe('string');
    expect(typeof item?.value).toBe('number');
  });

  // ── 4. Handling invalid year selection (selectedYear === -1) ─────────────

  it('should return an empty array when selectedYear is -1', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: -1,
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

    const mockData = [{ month: 'Jul', value: 2 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'own-user',
          userId: 'other-user',
          others: true,
          selectedYear: 2022,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('other-user'),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('year=2022'),
    );
  });

  it('should include user_id in the URL when others=false', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const mockData = [{ month: 'Aug', value: 7 }];
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'own-user',
          others: false,
          selectedYear: 2025,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('own-user'),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('year=2025'),
    );
  });

  // ── 6. Conditional execution – not connected ─────────────────────────────

  it('should NOT execute the query when isConnected=false', () => {
    mockeduseAppSelector.mockReturnValue(false);

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
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
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
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
        useGetAuthorYearlyWriteReport({
          user_id: '',
          selectedYear: 2024,
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
        useGetAuthorYearlyWriteReport({
          user_id: 'own-user',
          others: true,
          userId: undefined,
          selectedYear: 2024,
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
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });

  // ── 11. Returns an empty array for server response with no data ──────────

  it('should return empty array when server responds with empty yearlyWrites', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: [] } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });

  // ── 12. Multiple years data ──────────────────────────────────────────────

  it('should return 12 months of data for a full year', async () => {
    mockeduseAppSelector.mockReturnValue(false);

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const mockData = months.map((month, i) => ({ month, value: i + 1 }));
    mockedAxios.get.mockResolvedValueOnce({ data: { yearlyWrites: mockData } });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'user-1',
          selectedYear: 2024,
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(12);
    expect(result.current.data?.[0].month).toBe('Jan');
    expect(result.current.data?.[11].month).toBe('Dec');
  });
});
