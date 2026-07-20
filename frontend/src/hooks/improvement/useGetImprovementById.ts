import { GET_IMPROVEMENT_BY_ID } from '@/src/helper/APIUtils';
import { EditRequest } from '@/src/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {useSelector} from 'react-redux';
type AxiosError = any;

export const useGetImprovementById = (
  requestId: string,
): UseQueryResult<EditRequest, AxiosError> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-improvement-by-id', requestId],
    queryFn: async () => {
      const response = await axios.get(`${GET_IMPROVEMENT_BY_ID}/${requestId}`);

      return response.data as EditRequest;
    },
    enabled: !!requestId && !isGuest,
  });
};
