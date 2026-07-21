import axios from "axios"
import { PodcastData } from "../../schemas/type"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SEARCH_PODCAST } from "../../lib/api/APIUtils"
import { escapeRegexSpecialChars } from "../../lib/utils/SearchUtils"
type AxiosError = any;


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
      const regexEscapedQuery = escapeRegexSpecialChars(q);
      const urlEncodedQuery = encodeURIComponent(regexEscapedQuery);
      const res = await axios.get(SEARCH_PODCAST,{
        params:{
          q: urlEncodedQuery,
          page,
        },
      });

      return res.data as SearchResponse;
    },
    enabled: isConnected && !!q && !!page,
  });
}