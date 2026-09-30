import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { GET_ALL_PODCASTS } from "../../lib/api/APIUtils";
import { PodcastData } from "../../schemas/type";
import {Platform} from 'react-native';
import {demoPodcasts} from '../../lib/demo/demoContent';
type AxiosError = any;

type PodcastResponse = {
    totalPages: number;
    allPodcasts: PodcastData[];
}
export const useGetAllPodcasts = (isConnected: boolean, page: number): UseQueryResult<
PodcastResponse,
AxiosError
>=>{
    return useQuery({
    queryKey: ['get-all-podcasts', page],
    queryFn: async () => {
      if (Platform.OS === 'web') {
        return {allPodcasts: demoPodcasts, totalPages: 1};
      }
      const response = await axios.get(`${GET_ALL_PODCASTS}?page=${page}`);
      return response.data as PodcastResponse;
    },
    enabled: (Platform.OS === 'web' || isConnected) && !!page,
  });
}