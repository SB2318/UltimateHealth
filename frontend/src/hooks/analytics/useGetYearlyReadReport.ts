import { GET_YEARLY_READ_REPORT } from '@/src/lib/api/APIUtils';
import { YearStatus } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';

import {useAppSelector} from '../../store/hooks';

export const useGetAuthorYearlyReadReport = ({
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
    queryKey: ['get-user-yearly-read-report', user_id, userId, others],

    queryFn: async () => {
      if (selectedYear === -1) {
        return [];
      }

      let url = others
        ? `${GET_YEARLY_READ_REPORT}?userId=${userId}&year=${selectedYear}`
        : `${GET_YEARLY_READ_REPORT}?userId=${user_id}&year=${selectedYear}`;

      const response = await axios.get(url);

      return response.data.yearlyReads as YearStatus[];
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};
