import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { LIKE_PODCAST } from "../../lib/api/APIUtils";
import { useAppSelector } from "../../store/hooks";
type AxiosError = any;

export const useLikePodcast = (): UseMutationResult<
any,
AxiosError,
string
>=>{
    const isGuest = useAppSelector(state => state.user.isGuest);

    return useMutation({
    mutationKey: ['update-podcast-like-count'],
    mutationFn: async (podcastId: string) => {
      if (isGuest) {
        return Promise.reject(new Error('Guest cannot like podcasts'));
      }
      const res = await axios.post(
        `${LIKE_PODCAST}`,
        {
          podcast_id: podcastId,
        },
      );
      return res.data as any;
    },
 
  });
}