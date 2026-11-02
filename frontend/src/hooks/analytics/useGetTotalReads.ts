import { GET_TOTAL_READS } from '@/src/lib/api/APIUtils';
import { ReadStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';

import {useAppSelector} from '../../store/hooks';

export const useGetTotalReads = ({
  user_id,
  userId,
  others,
  isConnected,
}: {
  user_id: string;
  userId?: string;
  others?: boolean;
  isConnected?: boolean;
}): UseQueryResult<ReadStatus> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery<ReadStatus>({
    queryKey: ['get-total-reads', user_id, userId, others],

    queryFn: async () => {
      try {
        const url = others
          ? `${GET_TOTAL_READS}${userId}`
          : `${GET_TOTAL_READS}${user_id}`;

        const response = await axios.get(url);

        return (response?.data ?? { totalReads: 0, progress: 0 }) as ReadStatus;
      } catch {
        return { totalReads: 0, progress: 0 };
      }
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
