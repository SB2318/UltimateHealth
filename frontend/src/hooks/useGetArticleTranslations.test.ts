import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetArticleTranslations} from './useGetArticleTranslations';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetArticleTranslations', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches article translations successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {translations: [{id: 2, language: 'es'}]},
    });

    const {result} = renderHook(() => useGetArticleTranslations(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.translations.length).toBe(1);
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetArticleTranslations(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('appends language param correctly if provided', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {translations: []},
    });

    const {result} = renderHook(() => useGetArticleTranslations(1, 'fr'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.anything(),
      {params: {language: 'fr'}},
    );
  });
});
