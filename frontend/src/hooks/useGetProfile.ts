import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {User} from '../type';
import axios from 'axios';
import {GET_PROFILE_API} from '../helper/APIUtils';
import {useSelector} from 'react-redux';
type AxiosError = any;

export const useGetProfile = (): UseQueryResult<User, AxiosError> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-my-profile'],
    queryFn: async () => {
      const response = await axios.get(`${GET_PROFILE_API}`);
      return response.data.profile as User;
    },
    enabled: !isGuest,
  });
};
