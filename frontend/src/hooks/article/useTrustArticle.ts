import { TRUST_ARTICLE } from '@/src/helper/APIUtils';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
type AxiosError = any;

export const useTrustArticle = (
  articleId: number,
): UseMutationResult<
  {
    message: string;
    isTrusted: boolean;
  },
  AxiosError
> => {
  return useMutation({
    mutationKey: ['update-trust-status', articleId],

    mutationFn: async () => {
      const res = await axios.post(TRUST_ARTICLE, {
        article_id: articleId,
      });

      return res.data as {
        message: string;
        isTrusted: boolean;
      };
    },
  });
};
