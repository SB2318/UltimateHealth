import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authAxios from "../helper/authAxios";
import {
  COLLECTIONS_API,
  COLLECTION_BY_ID,
} from "../helper/APIUtils";
import { BookmarkCollection } from "../type";

export const useGetCollections = () =>
  useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await authAxios.get(COLLECTIONS_API);
      return res.data as BookmarkCollection[];
    },
  });

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-collection"],
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description?: string;
    }) => {
      const res = await authAxios.post(COLLECTIONS_API, { name, description });
      return res.data as BookmarkCollection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-collection"],
    mutationFn: async ({
      id,
      name,
      description,
    }: {
      id: string;
      name?: string;
      description?: string;
    }) => {
      const res = await authAxios.put(COLLECTION_BY_ID(id), {
        name,
        description,
      });
      return res.data as BookmarkCollection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-collection"],
    mutationFn: async (id: string) => {
      await authAxios.delete(COLLECTION_BY_ID(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useAddArticleToCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-article-to-collection"],
    mutationFn: async ({
      collectionId,
      articleId,
    }: {
      collectionId: string;
      articleId: number;
    }) => {
      const res = await authAxios.post(
        `${COLLECTIONS_API}/${collectionId}/articles`,
        { articleId }
      );
      return res.data as BookmarkCollection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useRemoveArticleFromCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove-article-from-collection"],
    mutationFn: async ({
      collectionId,
      articleId,
    }: {
      collectionId: string;
      articleId: number;
    }) => {
      const res = await authAxios.delete(
        `${COLLECTIONS_API}/${collectionId}/articles/${articleId}`
      );
      return res.data as BookmarkCollection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};
