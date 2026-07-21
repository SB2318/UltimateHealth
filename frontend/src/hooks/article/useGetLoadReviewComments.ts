import { LOAD_REVIEW_COMMENTS } from '@/src/lib/api/APIUtils';
import { Comment } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetLoadReviewComments.ts
import {LOAD_REVIEW_COMMENTS} from '../helper/APIUtils';
import {Comment} from '../type';
import {useAppSelector} from '../../store/hooks';
=======

import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/article/useGetLoadReviewComments.ts
type AxiosError = any;

export const useGetLoadReviewComments = (
  articleId: number | undefined,
  requestId: string | undefined,
  isConnected: boolean
): UseQueryResult<Comment[], AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-review-comments', articleId, requestId],

    queryFn: async () => {
      const response = await axios.get(
        `${LOAD_REVIEW_COMMENTS}?articleId=${articleId}&requestId=${requestId}`,
      );

      return response.data as Comment[];
    },
    enabled: !!isConnected && !isGuest
  });
};
