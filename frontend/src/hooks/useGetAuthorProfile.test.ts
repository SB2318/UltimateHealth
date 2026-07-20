import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {useGetAuthorProfile} from './useGetAuthorProfile';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetAuthorProfile', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes query successfully and calls API', async () => {
    // Hook uses axios.get (it's a useQuery, not a mutation)
    mockedAxios.get.mockResolvedValueOnce({data: {data: {id: 'test-id', name: 'Author Name'}}});

    const {result} = renderHook(
      () => useGetAuthorProfile('test-id', undefined, 'test-id', true),
      {wrapper: makeWrapper()},
    );

    // useQuery fires automatically when enabled=true; wait for it to settle
    await waitFor(() =>
      expect(result.current.isSuccess || result.current.isError).toBe(true),
    );

    expect(result.current.isSuccess).toBe(true);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('getuserprofile'),
    );
  });

  it('returns undefined when isConnected is false (query disabled)', () => {
    const {result} = renderHook(
      () => useGetAuthorProfile('test-id', undefined, 'test-id', false),
      {wrapper: makeWrapper()},
    );

    // enabled=false so query never runs
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
