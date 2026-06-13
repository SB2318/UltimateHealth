import {useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import {Collection} from '../type';
import {COLLECTIONS} from '../helper/APIUtils';
import axios, {AxiosError} from 'axios';

export const useCollections = (): UseQueryResult<Collection[], AxiosError> => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const res = await axios.get(COLLECTIONS);
      return res.data as Collection[];
    },
  });
};

export const useCreateCollection = (): UseMutationResult<Collection, AxiosError, {name: string; description?: string}> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-collection'],
    mutationFn: async ({name, description}) => {
      const res = await axios.post(COLLECTIONS, {name, description});
      return res.data as Collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['collections']});
    },
  });
};

export const useDeleteCollection = (): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-collection'],
    mutationFn: async (collectionId: string) => {
      await axios.delete(`${COLLECTIONS}/${collectionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['collections']});
    },
  });
};
