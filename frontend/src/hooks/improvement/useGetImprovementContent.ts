import { GET_IMPROVEMENT_CONTENT } from '@/src/lib/api/APIUtils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
<<<<<<< HEAD:frontend/src/hooks/useGetImprovementContent.ts
import { GET_IMPROVEMENT_CONTENT } from '../helper/APIUtils';
import { useAppSelector } from '../store/hooks';
=======
import { useSelector } from 'react-redux';
>>>>>>> upstream/main:frontend/src/hooks/improvement/useGetImprovementContent.ts

interface Props {
  recordId?: string;
  articleRecordId?: string;
}

export const useGetImprovementContent = ({
  recordId,
  articleRecordId,
}: Props) => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-improvement-content', recordId, articleRecordId],
    queryFn: async () => {
      let url = '';

      if (recordId) {
        url = `${GET_IMPROVEMENT_CONTENT}?articleRecordId=${articleRecordId}`;
      } else {
        url = `${GET_IMPROVEMENT_CONTENT}?recordid=${recordId}&articleRecordId=${articleRecordId}`;
      }

      const response = await axios.get(url);

      return response.data.htmlContent as string;
    },
    enabled: !!articleRecordId && !isGuest,
  });
};