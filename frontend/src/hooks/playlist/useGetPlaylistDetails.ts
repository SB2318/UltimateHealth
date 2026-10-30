import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { PodcastData } from '../../schemas/type';
import { GET_PLAYLIST_DETAILS } from '../../lib/api/APIUtils';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/ReduxStore';

type AxiosError = any;

export const useGetPlaylistDetails = (
  playlistId: string | undefined,
): UseQueryResult<PodcastData[], AxiosError> => {
  const isGuest = useAppSelector((state: RootState) => state.user.isGuest);

  return useQuery({
    queryKey: ['playlist-details', playlistId],
    queryFn: async () => {
      if (!playlistId) return [];
      const res = await axios.get(GET_PLAYLIST_DETAILS, {
        params: {
          playlist_id: playlistId,
        },
      });
      return (res.data || []) as PodcastData[];
    },
    enabled: Boolean(playlistId) && !isGuest,
  });
};
