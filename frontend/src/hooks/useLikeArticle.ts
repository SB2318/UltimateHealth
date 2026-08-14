import axios, {AxiosError} from 'axios';
import {ArticleData} from '../type';
import {useCallback, useRef} from 'react';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {LIKE_ARTICLE} from '../helper/APIUtils';
import {useSelector} from 'react-redux';

export type LikeArticleResponse = {
  article: ArticleData;
  likeStatus: boolean;
};

type LikeArticleVariables = undefined;
type MutationOptions = Parameters<
  UseMutationResult<
    LikeArticleResponse,
    AxiosError,
    LikeArticleVariables
  >['mutate']
>[1];

export const useLikeArticle = (
  articleId: number,
): UseMutationResult<
  LikeArticleResponse,
  AxiosError,
  LikeArticleVariables
> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  const mutation = useMutation<
    LikeArticleResponse,
    AxiosError,
    LikeArticleVariables
  >({
    mutationKey: ['update-like-status', articleId],

    mutationFn: async () => {
      if (isGuest) {
        return Promise.reject(new Error('Guest cannot like articles'));
      }
      const res = await axios.post(LIKE_ARTICLE, {
        article_id: articleId,
      });

      return res.data.data as LikeArticleResponse;
    },
  });

  // Guard against rapid taps: only one like/unlike request may be in flight
  // at a time per hook instance (fixes #1934 race condition).
  const inFlightRef = useRef(false);

  const guardedMutate = useCallback(
    (
      variables: LikeArticleVariables,
      options?: MutationOptions,
    ) => {
      if (inFlightRef.current) {
        return;
      }
      inFlightRef.current = true;
      mutation.mutate(variables, {
        ...options,
        onSettled: (data, error, vars, context) => {
          inFlightRef.current = false;
          options?.onSettled?.(data, error, vars, context);
        },
      });
    },
    [mutation],
  );

  return {...mutation, mutate: guardedMutate};
};