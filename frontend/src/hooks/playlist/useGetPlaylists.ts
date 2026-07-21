import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PlayList} from '../../schemas/type';
import {GET_PLAYLIST} from '../../lib/api/APIUtils';
import axios from 'axios';
import {useAppSelector} from '../../store/hooks';
type AxiosError = any;

export const useGetPlaylists = (): UseQueryResult<PlayList[], AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-my-playlists'],
    queryFn: async () => {
      const res = await axios.get(GET_PLAYLIST);
      return res.data as PlayList[];
    },
    enabled: !isGuest,
  });
};
