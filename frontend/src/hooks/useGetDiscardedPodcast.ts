import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../type";
import axios from "axios";
import { DISCARDED_PODCASTS } from "../helper/APIUtils";
type AxiosError = any;

type DiscardResponse = {
    totalPages: number;
    discardedPodcasts: PodcastData[];
}

export const useGetDiscardedPodcasts = (discardedPage: number, isConnected: boolean): UseQueryResult<
DiscardResponse,
AxiosError
>=>{

    return useQuery({
    queryKey: ['get-discarded-podcasts-for-user', discardedPage],
    queryFn: async () => {
      const res = await axios.get(`${DISCARDED_PODCASTS}?page=${discardedPage}`);
      return res.data as DiscardResponse;
    },
    enabled: !!discardedPage && !!isConnected,
  });
}