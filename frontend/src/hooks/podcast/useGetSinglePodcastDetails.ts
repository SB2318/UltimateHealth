import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../../schemas/type";
import axios from "axios";
import { GET_PODCAST_DETAILS } from "../../lib/api/APIUtils";
import {Platform} from 'react-native';
import {demoPodcasts} from '../../lib/demo/demoContent';
type AxiosError = any;

export const useGetSinglePodcastDetails = (trackId: string): UseQueryResult<
PodcastData,
AxiosError
>=>{
  return useQuery({
    queryKey: ['get-podcast-details', trackId],
    queryFn: async () => {
      if (Platform.OS === 'web') {
        const demoPodcast = demoPodcasts.find(item => item._id === trackId);
        if (demoPodcast) {
          return demoPodcast;
        }
      }
      const response = await axios.get(
        `${GET_PODCAST_DETAILS}?podcast_id=${trackId}`
      );
      return response.data as PodcastData;
    },
    enabled: Platform.OS !== 'web' || trackId.startsWith('demo-'),
  });
}