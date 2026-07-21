import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetReportReasons.ts
import {GET_REPORT_REASONS} from '../helper/APIUtils';
import {ReportReason} from '../type';
import {useAppSelector} from '../../store/hooks';
=======
import {GET_REPORT_REASONS} from '../../lib/api/APIUtils';
import {ReportReason} from '../../schemas/type';
import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/moderation/useGetReportReasons.ts
type AxiosError = any;

const reasonsFunc = async () => {
  const {data: categoryData} = await axios.get(
    GET_REPORT_REASONS
  );

  return categoryData as ReportReason[];
};

export const useGetReasons = (isConnected: boolean): UseQueryResult<
  ReportReason[],
  AxiosError
> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-report-reasons'],
    queryFn: reasonsFunc,
    enabled: isConnected && !isGuest
  });
};
