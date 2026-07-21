import { GET_IMPROVEMENT_BY_ID } from '@/src/lib/api/APIUtils';
import { EditRequest } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetImprovementById.ts
import {GET_IMPROVEMENT_BY_ID} from '../helper/APIUtils';
import {useAppSelector} from '../../store/hooks';
=======
import {useSelector} from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/improvement/useGetImprovementById.ts
type AxiosError = any;

export const useGetImprovementById = (
  requestId: string,
): UseQueryResult<EditRequest, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-improvement-by-id', requestId],
    queryFn: async () => {
      const response = await axios.get(`${GET_IMPROVEMENT_BY_ID}/${requestId}`);

      return response.data as EditRequest;
    },
    enabled: !!requestId && !isGuest,
  });
};
