import axios from "axios"
import { PodcastData } from "../type"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SEARCH_PODCAST } from "../helper/APIUtils"
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
      const res = await axios.get(SEARCH_PODCAST,{
        params:{
          q,
          page,
        },
      });
      

      return res.data as SearchResponse;
    },
    enabled: isConnected && !!q && !!page,
  });
}