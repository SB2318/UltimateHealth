import axios from 'axios';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import { LIKE_ARTICLE } from '@/src/helper/APIUtils';
import { ArticleData } from '@/src/type';
type AxiosError = any;

export const useLikeArticle = (
  articleId: number,
): UseMutationResult<
  {
    article: ArticleData;
    likeStatus: boolean;
  },
  AxiosError, void> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useMutation({
    mutationKey: ['update-like-status', articleId],

    mutationFn: async () => {
      if (isGuest) {
        return Promise.reject(new Error('Guest cannot like articles'));
      }
      const res = await axios.post(LIKE_ARTICLE, {
        article_id: articleId,
      });

      return res.data.data as {
        article: ArticleData;
        likeStatus: boolean;
      };
    },
  });
};
