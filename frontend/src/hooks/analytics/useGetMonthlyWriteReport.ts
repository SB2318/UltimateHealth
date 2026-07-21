import { GET_MONTHLY_WRITES_REPORT } from '@/src/lib/api/APIUtils';
import { MonthStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetMonthlyWriteReport.ts
import {MonthStatus} from '../type';
import {GET_MONTHLY_WRITES_REPORT} from '../helper/APIUtils';
import {useAppSelector} from '../../store/hooks';
=======

import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/analytics/useGetMonthlyWriteReport.ts

export const useGetAuthorMonthlyWriteReport = ({
  user_id,
  selectedMonth,
  userId,
  others,
  isConnected,
}: {
  user_id: string;
  selectedMonth: number;
  userId?: string;
  others?: boolean;
  isConnected?: boolean;
}): UseQueryResult<MonthStatus[]> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery<MonthStatus[]>({
    queryKey: ['get-user-monthly-write-report', user_id, userId, others],

    queryFn: async () => {
      if (selectedMonth === -1) {
        return [];
      }

      let url = others
        ? `${GET_MONTHLY_WRITES_REPORT}?userId=${userId}&month=${selectedMonth}`
        : `${GET_MONTHLY_WRITES_REPORT}?userId=${user_id}&month=${selectedMonth}`;

      const response = await axios.get(url);

      return response.data.monthlyWrites as MonthStatus[];
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
