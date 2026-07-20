import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PodcastData } from "../../schemas/type";
import axios from "axios";
import { PENDING_PODCASTS } from "../../lib/api/APIUtils";
type AxiosError = any;

type PendingRes = {
 totalPages: number;
 pendingPodcasts: PodcastData[];
};

export const useGetPendingPodcasts = (pendingPage: number, isConnected: boolean): UseQueryResult<
PendingRes,
AxiosError
>=>{
  
    return  useQuery({
      queryKey: ['get-pending-podcasts-for-user', pendingPage],
      queryFn: async () => {
        const response = await axios.get(
          `${PENDING_PODCASTS}?page=${pendingPage}`
        );
        return response.data as PendingRes;
      },
      enabled: !!pendingPage && !!isConnected
    });
}