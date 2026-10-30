import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {UPLOAD_PODCAST} from '../../lib/api/APIUtils';
import axios from 'axios';
import {Category} from '../../schemas/type';
type AxiosError = any;

type PodcastReq = {
  title: string;
  description: string;
  tags: Category[];
  article_id: string | null;
  audio_url: string;
  cover_image: string;
  duration: number;
  episode_id?: string | null;
};
export const useUploadPodcast = (): UseMutationResult<
  string,
  AxiosError,
  PodcastReq
> => {
  return useMutation({
    mutationKey: ['uploadPodcast'],
    mutationFn: async ({
      audio_url,
      cover_image,
      title,
      description,
      tags,
      article_id,
      duration,
      episode_id,
    }: PodcastReq) => {
      const response = await axios.post(UPLOAD_PODCAST, {
        title: title,
        description: description,
        tags: tags,
        article_id: null,
        audio_url: audio_url,
        cover_image: cover_image,
        duration: duration,
        episode_id: episode_id || null,
      });

      return response.data.message as string;
    },
  });
};
