import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CREATE_PODCAST_EPISODE } from '../../lib/api/APIUtils';
import { PodcastEpisode } from '../../schemas/type';

type AxiosError = any;

type CreateEpisodeReq = {
  name: string;
  description?: string;
};

export const useCreatePodcastEpisode = (): UseMutationResult<
  PodcastEpisode,
  AxiosError,
  CreateEpisodeReq
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-podcast-episode'],
    mutationFn: async (req: CreateEpisodeReq) => {
      const res = await axios.post(CREATE_PODCAST_EPISODE, req);
      return res.data as PodcastEpisode;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['podcast-episodes'],
      });
    },
  });
};
