import { GET_TOTAL_LIKES_VIEWS } from '@/src/lib/api/APIUtils';
import { UserStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const useGetTotalLikeViewStatus = ({
  user_id,
  userId,
  others,
  isConnected,
}: {
  user_id: string;
  userId?: string;
  others?: boolean;
  isConnected?: boolean;
}): UseQueryResult<UserStatus> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useQuery<UserStatus>({
    queryKey: ['get-like-view-status', user_id, userId, others],

    queryFn: async () => {
      const url = others
        ? `${GET_TOTAL_LIKES_VIEWS}${userId}`
        : `${GET_TOTAL_LIKES_VIEWS}${user_id}`;

       
      const response = await axios.get(url);
    
      return response.data as UserStatus;
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
