import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { PodcastEpisode } from '../../schemas/type';
import { GET_PODCAST_EPISODES } from '../../lib/api/APIUtils';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/ReduxStore';

type AxiosError = any;

export const useGetPodcastEpisodes = (): UseQueryResult<PodcastEpisode[], AxiosError> => {
  const isGuest = useAppSelector((state: RootState) => state.user.isGuest);
  const userId = useAppSelector((state: RootState) => state.user.user_id);
  const user_token = useAppSelector((state: RootState) => state.user.user_token);

  return useQuery({
    queryKey: ['podcast-episodes', userId],
    queryFn: async () => {
      try {
        const res = await axios.get(GET_PODCAST_EPISODES);
        return (res?.data || []) as PodcastEpisode[];
      } catch {
        return [];
      }
    },
    enabled: !isGuest && user_token !== '' && user_token !== null,
  });
};
