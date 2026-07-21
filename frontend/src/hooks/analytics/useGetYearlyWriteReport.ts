import { GET_YEARLY_WRITES_REPORT } from '@/src/lib/api/APIUtils';
import { YearStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetYearlyWriteReport.ts
import {YearStatus} from '../type';
import {GET_YEARLY_WRITES_REPORT} from '../helper/APIUtils';
import {useAppSelector} from '../../store/hooks';
=======

import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/analytics/useGetYearlyWriteReport.ts

export const useGetAuthorYearlyWriteReport = ({
  user_id,
  selectedYear,
  userId,
  others,
  isConnected,
}: {
  user_id: string;
  selectedYear: number;
  userId?: string;
  others?: boolean;
  isConnected?: boolean;
}): UseQueryResult<YearStatus[]> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery<YearStatus[]>({
    queryKey: ['get-user-yearly-write-report', user_id, userId, others],

    queryFn: async () => {
      if (selectedYear === -1) {
        return [];
      }

      let url = others
        ? `${GET_YEARLY_WRITES_REPORT}?userId=${userId}&year=${selectedYear}`
        : `${GET_YEARLY_WRITES_REPORT}?userId=${user_id}&year=${selectedYear}`;

      const response = await axios.get(url);

      return response.data.yearlyWrites as YearStatus[];
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
