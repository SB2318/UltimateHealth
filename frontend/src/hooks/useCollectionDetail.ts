import { useQuery } from "@tanstack/react-query";
import authAxios from "../helper/authAxios";
import { COLLECTION_BY_ID } from "../helper/APIUtils";
import { CollectionDetailResponse } from "../type";

export const useGetCollectionDetail = (id: string, page: number = 1) =>
  useQuery({
    queryKey: ["collection-detail", id, page],
    queryFn: async () => {
      const res = await authAxios.get(
        `${COLLECTION_BY_ID(id)}?page=${page}&limit=20`
      );
      return res.data as CollectionDetailResponse;
    },
    enabled: !!id,
  });
