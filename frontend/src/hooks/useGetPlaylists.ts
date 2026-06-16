import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PlayList} from '../type';
import {GET_PLAYLIST} from '../helper/APIUtils';
import axios, {AxiosError} from 'axios';
import { useAppSelector } from './reduxHooks';


export const useGetPlaylists = (): UseQueryResult<PlayList[], AxiosError> => {
  const isGuest = useAppSelector((state => state.user.isGuest);

  return useQuery({
    queryKey: ['get-my-playlists'],
    queryFn: async () => {
      const res = await axios.get(GET_PLAYLIST);
      return res.data as PlayList[];
    },
    enabled: !isGuest,
  });
};
