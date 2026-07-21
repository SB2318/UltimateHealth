import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {User} from '../../schemas/type';
import axios from 'axios';
import {GET_PROFILE_API} from '../../lib/api/APIUtils';
import {useAppSelector} from '../../store/hooks';
type AxiosError = any;

export const useGetProfile = (): UseQueryResult<User, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-my-profile'],
    queryFn: async () => {
      const response = await axios.get(`${GET_PROFILE_API}`);
      // console.log('[useGetProfile] status:', response.status);
      //console.log('[useGetProfile] response.data keys:', Object.keys(response.data || {}));
      //console.log('[useGetProfile] response.data:', JSON.stringify(response.data).slice(0, 500));

      //console.log('[useGetProfile] response.data.user:', JSON.stringify(response.data.user).slice(0, 500));
      const data =  response.data.data;
      return data as User;
    },
    enabled: !isGuest,
  });
};
