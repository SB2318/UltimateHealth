import axios from "axios";
import { GET_PROFILE_IMAGE_BY_ID } from "../../lib/api/APIUtils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
type AxiosError = any;

export const useGetUserProfileImage = (authorId: string): UseQueryResult<
  string | null,
  AxiosError
> => {
  return useQuery({
    queryKey: ['author_profile_image', authorId],
    queryFn: async () => {
      try {
        if (!authorId) return null;
        const response = await axios.get(
          `${GET_PROFILE_IMAGE_BY_ID}/${authorId}`,
        );
        return (response?.data?.profile_image ?? null) as string | null;
      } catch {
        return null;
      }
    },
    enabled: Boolean(authorId),
  });
};
