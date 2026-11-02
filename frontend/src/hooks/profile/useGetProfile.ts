import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {User} from '../../schemas/type';
import axios from 'axios';
import {GET_PROFILE_API} from '../../lib/api/APIUtils';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/ReduxStore';
type AxiosError = any;

export const useGetProfile = (): UseQueryResult<User, AxiosError> => {
  const isGuest = useAppSelector((state: RootState) => state.user.isGuest);
  const userId = useAppSelector((state: RootState) => state.user.user_id);
  const user_token = useAppSelector((state: RootState) => state.user.user_token);

  return useQuery({
    queryKey: ['get-my-profile', userId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_PROFILE_API}`);
        const data =
          response?.data?.data ??
          response?.data?.profile ??
          response?.data ??
          null;
        return (data ?? null) as User;
      } catch (error) {
        if (__DEV__) {
          console.warn('[useGetProfile] Network/query fetch error:', error);
        }
        return null as unknown as User;
      }
    },
    enabled: !isGuest && user_token !== '' && user_token !== null,
  });
};
