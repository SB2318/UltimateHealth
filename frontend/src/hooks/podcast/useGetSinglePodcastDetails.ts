import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../../schemas/type";
import axios from "axios";
import { GET_PODCAST_DETAILS } from "../../lib/api/APIUtils";
type AxiosError = any;

export const useGetSinglePodcastDetails = (trackId: string): UseQueryResult<
PodcastData,
AxiosError
>=>{
  return useQuery({
    queryKey: ['get-podcast-details', trackId],
    queryFn: async () => {
      const response = await axios.get(
        `${GET_PODCAST_DETAILS}?podcast_id=${trackId}`
      );
      return response.data as PodcastData;
    },
  });  
}