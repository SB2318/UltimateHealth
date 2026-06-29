import axios, { AxiosError } from "axios"
import { PodcastData } from "../type"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SEARCH_PODCAST } from "../helper/APIUtils"
import { escapeRegexSpecialChars } from "../helper/SearchUtils"


type SearchResponse = {
    totalPages: number,
    matchPodcasts: PodcastData[]
}
export const useGetSearchPodcasts = (isConnected: boolean, page: number, q: string): UseQueryResult<
SearchResponse,
AxiosError
>=>{
  return useQuery({
    queryKey: ['search-podcasts', page, q],
    queryFn: async () => {
      const escapedQuery = encodeURIComponent(q);
      const res = await axios.get(`${SEARCH_PODCAST}?q=${escapedQuery}&page=${page}`);

      return res.data as SearchResponse;
    },
    enabled: isConnected && !!q && !!page,
  });
}