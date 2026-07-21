import { GET_TOTAL_READS } from '@/src/lib/api/APIUtils';
import { ReadStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetTotalReads.ts
import {ReadStatus} from '../type';
import {GET_TOTAL_READS} from '../helper/APIUtils';
import {useAppSelector} from '../../store/hooks';
=======

import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/analytics/useGetTotalReads.ts

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
      const url = others
        ? `${GET_TOTAL_READS}${userId}`
        : `${GET_TOTAL_READS}${user_id}`;

      const response = await axios.get(url);

      return response.data as ReadStatus;
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
