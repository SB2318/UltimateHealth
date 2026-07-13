import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useSelector} from 'react-redux';
import {GET_MONTHLY_WRITES_REPORT, GET_TOTAL_WRITES, GET_YEARLY_WRITES_REPORT} from '../../helper/APIUtils';
import {useGetAuthorMonthlyWriteReport} from '../useGetMonthlyWriteReport';
import {useGetTotalWrites} from '../useGetTotalWrites';
import {useGetAuthorYearlyWriteReport} from '../useGetYearlyWriteReport';

jest.mock('axios');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedUseSelector = useSelector as jest.Mock;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}},
  });

  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('write analytics hooks', () => {
  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({user: {isGuest: false}}),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches total writes for the signed-in user', async () => {
    const response = {totalWrites: 12};
    mockedAxios.get.mockResolvedValueOnce({data: response});

    const {result} = renderHook(
      () => useGetTotalWrites({user_id: 'author-1', isConnected: true}),
      {wrapper: makeWrapper()},
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GET_TOTAL_WRITES}author-1`,
    );
    expect(result.current.data).toEqual(response);
  });

  it('does not run total writes query for guest users', () => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({user: {isGuest: true}}),
    );

    const {result} = renderHook(
      () => useGetTotalWrites({user_id: 'author-1', isConnected: true}),
      {wrapper: makeWrapper()},
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('returns an empty monthly report for invalid month without hitting the API', async () => {
    const {result} = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'author-1',
          selectedMonth: -1,
          isConnected: true,
        }),
      {wrapper: makeWrapper()},
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });

  it('fetches monthly writes for another user when others mode is enabled', async () => {
    const monthlyWrites = [{month: 'May', count: 4}];
    mockedAxios.get.mockResolvedValueOnce({data: {monthlyWrites}});

    const {result} = renderHook(
      () =>
        useGetAuthorMonthlyWriteReport({
          user_id: 'author-1',
          userId: 'author-2',
          selectedMonth: 5,
          others: true,
          isConnected: true,
        }),
      {wrapper: makeWrapper()},
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GET_MONTHLY_WRITES_REPORT}?userId=author-2&month=5`,
    );
    expect(result.current.data).toEqual(monthlyWrites);
  });

  it('returns an empty yearly report for invalid year without hitting the API', async () => {
    const {result} = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'author-1',
          selectedYear: -1,
          isConnected: true,
        }),
      {wrapper: makeWrapper()},
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });

  it('fetches yearly writes for another user when others mode is enabled', async () => {
    const yearlyWrites = [{year: '2025', count: 9}];
    mockedAxios.get.mockResolvedValueOnce({data: {yearlyWrites}});

    const {result} = renderHook(
      () =>
        useGetAuthorYearlyWriteReport({
          user_id: 'author-1',
          userId: 'author-2',
          selectedYear: 2025,
          others: true,
          isConnected: true,
        }),
      {wrapper: makeWrapper()},
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GET_YEARLY_WRITES_REPORT}?userId=author-2&year=2025`,
    );
    expect(result.current.data).toEqual(yearlyWrites);
  });
});
