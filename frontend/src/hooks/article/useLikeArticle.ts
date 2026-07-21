import axios from 'axios';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
<<<<<<< HEAD:frontend/src/hooks/useLikeArticle.ts
import {LIKE_ARTICLE} from '../helper/APIUtils';
import {useAppSelector} from '../../store/hooks';
=======
import {useSelector} from 'react-redux';
import { LIKE_ARTICLE } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
>>>>>>> upstream/main:frontend/src/hooks/article/useLikeArticle.ts
type AxiosError = any;

export const useLikeArticle = (
  articleId: number,
): UseMutationResult<
  {
    article: ArticleData;
    likeStatus: boolean;
  },
  AxiosError, void> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

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
