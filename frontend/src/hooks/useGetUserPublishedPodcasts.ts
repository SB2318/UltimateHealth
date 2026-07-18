import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../type";
import axios from "axios";
import { USER_PUBLISHED_PODCASTS } from "../helper/APIUtils";
type AxiosError = any;


type PublishRes = {
    totalPages: number;
    publishedPodcasts: PodcastData[];
}
export const useGetUserPublishedPodcasts = (publishedPage: number, isConnected: number): UseQueryResult<
PublishRes,
AxiosError
>=>{

    return useQuery({
    queryKey: ['get-published-podcasts-for-user', publishedPage],
    queryFn: async () => {
      const response = await axios.get(
        `${USER_PUBLISHED_PODCASTS}?page=${publishedPage}`
      );
      return response.data as PublishRes;
    },
    enabled:  !!publishedPage && !!isConnected,
  });
}