import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {GET_REPORT_REASONS} from '../helper/APIUtils';
import {ReportReason} from '../type';
import {useAppSelector} from 'react-redux';
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
