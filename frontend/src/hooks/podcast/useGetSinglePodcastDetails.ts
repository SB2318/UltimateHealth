import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../../schemas/type";
import axios from "axios";
import { GET_PODCAST_DETAILS } from "../../lib/api/APIUtils";
type AxiosError = any;

export const useGetSinglePodcastDetails = (trackId: string): UseQueryResult<
  PodcastData | null,
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-podcast-details', trackId],
    queryFn: async () => {
      if (!trackId) return null;
      const response = await axios.get(
        `${GET_PODCAST_DETAILS}?podcast_id=${trackId}`
      );
      return (response?.data ?? null) as PodcastData | null;
    },
    enabled: Boolean(trackId),
  });  
};
