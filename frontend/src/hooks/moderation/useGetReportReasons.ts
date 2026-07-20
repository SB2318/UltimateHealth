import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {GET_REPORT_REASONS} from '../../lib/api/APIUtils';
import {ReportReason} from '../../schemas/type';
import {useSelector} from 'react-redux';
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
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-report-reasons'],
    queryFn: reasonsFunc,
    enabled: isConnected && !isGuest
  });
};
