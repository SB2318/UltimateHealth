import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { REMOVE_PODCAST_FROM_PLAYLIST } from '../../lib/api/APIUtils';

type AxiosError = any;

type RemoveFromPlaylistReq = {
  podcast_id: string;
  playlist_id: string;
};

export const useRemoveFromPlaylist = (): UseMutationResult<
  any,
  AxiosError,
  RemoveFromPlaylistReq
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove-from-playlist'],
    mutationFn: async ({ podcast_id, playlist_id }: RemoveFromPlaylistReq) => {
      const res = await axios.post(REMOVE_PODCAST_FROM_PLAYLIST, {
        podcast_id,
        playlist_id,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['playlist-details', variables.playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-my-playlists'],
      });
    },
  });
};
