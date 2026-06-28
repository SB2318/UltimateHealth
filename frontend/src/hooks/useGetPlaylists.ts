import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PlayList} from '../type';
import {GET_PLAYLIST} from '../helper/APIUtils';
import axios from 'axios';
type AxiosError = any;
import {useSelector} from 'react-redux';

export const useGetPlaylists = (): UseQueryResult<PlayList[], AxiosError> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-my-playlists'],
    queryFn: async () => {
      const res = await axios.get(GET_PLAYLIST);
      return res.data as PlayList[];
    },
    enabled: !isGuest,
  });
};
