import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DELETE_PODCAST_EPISODE } from '../../lib/api/APIUtils';

type AxiosError = any;

export const useDeletePodcastEpisode = (): UseMutationResult<
  any,
  AxiosError,
  { episodeId: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-podcast-episode'],
    mutationFn: async ({ episodeId }: { episodeId: string }) => {
      const res = await axios.delete(DELETE_PODCAST_EPISODE(episodeId));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['podcast-episodes'],
      });
    },
  });
};
