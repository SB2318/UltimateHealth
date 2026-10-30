import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DELETE_PLAYLIST } from '../../lib/api/APIUtils';

type AxiosError = any;

export const useDeletePlaylist = (): UseMutationResult<
  any,
  AxiosError,
  { playlistId: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-playlist'],
    mutationFn: async ({ playlistId }: { playlistId: string }) => {
      const res = await axios.delete(DELETE_PLAYLIST, {
        data: {
          playlistId,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-my-playlists'],
      });
    },
  });
};
