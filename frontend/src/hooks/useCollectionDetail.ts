import {useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import {Collection, ArticleData} from '../type';
import {COLLECTIONS} from '../helper/APIUtils';
import axios, {AxiosError} from 'axios';

export const useCollectionDetail = (collectionId: string): UseQueryResult<Collection, AxiosError> => {
  return useQuery({
    queryKey: ['collection-detail', collectionId],
    queryFn: async () => {
      const res = await axios.get(`${COLLECTIONS}/${collectionId}`);
      return res.data as Collection;
    },
    enabled: !!collectionId,
  });
};

export const useAddArticleToCollection = (): UseMutationResult<Collection, AxiosError, {collectionId: string; articleId: number}> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-article-to-collection'],
    mutationFn: async ({collectionId, articleId}) => {
      const res = await axios.post(`${COLLECTIONS}/${collectionId}/articles`, {articleId});
      return res.data as Collection;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: ['collection-detail', variables.collectionId]});
      queryClient.invalidateQueries({queryKey: ['collections']});
    },
  });
};

export const useRemoveArticleFromCollection = (): UseMutationResult<Collection, AxiosError, {collectionId: string; articleId: number}> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove-article-from-collection'],
    mutationFn: async ({collectionId, articleId}) => {
      const res = await axios.delete(`${COLLECTIONS}/${collectionId}/articles/${articleId}`);
      return res.data as Collection;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: ['collection-detail', variables.collectionId]});
      queryClient.invalidateQueries({queryKey: ['collections']});
    },
  });
};
