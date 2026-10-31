import { GET_TOTAL_LIKES_VIEWS } from '@/src/lib/api/APIUtils';
import { UserStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {useAppSelector} from '../../store/hooks';

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
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery<UserStatus>({
    queryKey: ['get-like-view-status', user_id, userId, others],

    queryFn: async () => {
      try {
        const url = others
          ? `${GET_TOTAL_LIKES_VIEWS}${userId}`
          : `${GET_TOTAL_LIKES_VIEWS}${user_id}`;

        const response = await axios.get(url);

        return (
          response?.data ?? {
            totalLikes: 0,
            totalViews: 0,
            likeProgress: 0,
            viewProgress: 0,
          }
        ) as UserStatus;
      } catch {
        return {
          totalLikes: 0,
          totalViews: 0,
          likeProgress: 0,
          viewProgress: 0,
        };
      }
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
