import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { PodcastData } from '../../schemas/type';
import { GET_EPISODE_PODCASTS } from '../../lib/api/APIUtils';

type AxiosError = any;

export const useGetEpisodePodcasts = (
  episodeId: string | undefined,
): UseQueryResult<PodcastData[], AxiosError> => {
  return useQuery({
    queryKey: ['episode-podcasts', episodeId],
    queryFn: async () => {
      try {
        if (!episodeId) return [];
        const res = await axios.get(GET_EPISODE_PODCASTS(episodeId));
        return (res?.data || []) as PodcastData[];
      } catch {
        return [];
      }
    },
    enabled: Boolean(episodeId),
  });
};
