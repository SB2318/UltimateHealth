import { GET_ALL_ARTICLES_FOR_USER } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';

interface Props {
  page: number;
  selectedStatus: number;
  visit: number;
  setVisit: (v: number) => void;
  setTotalPages: (v: number) => void;
  setArticleData: React.Dispatch<React.SetStateAction<ArticleData[]>>;
  setPublishedLabel: (v: string) => void;
  setProgressLabel: (v: string) => void;
  setDiscardLabel: (v: string) => void;
}

export const useGetAllArticlesForUser = ({
  page,
  selectedStatus,
  visit,
  setVisit,
  setTotalPages,
  setArticleData,
  setPublishedLabel,
  setProgressLabel,
  setDiscardLabel,
}: Props) => {
  const { isGuest, user_token } = useAppSelector((state: any) => state.user);

  return useQuery({
    queryKey: ['get-all-articles-for-user', page, selectedStatus],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${GET_ALL_ARTICLES_FOR_USER}?page=${page}&status=${selectedStatus}&visit=${visit}`
        );

        const data = response?.data;
        const incomingArticles: ArticleData[] = Array.isArray(data?.articles)
          ? data.articles
          : [];

        if (Number(page) === 1) {
          setTotalPages(typeof data?.totalPages === 'number' ? data.totalPages : 0);
          setArticleData(incomingArticles);
        } else if (incomingArticles.length > 0) {
          setArticleData(prev => {
            const existingIds = new Set(prev.map(item => String(item._id)));
            const uniqueIncoming = incomingArticles.filter(
              item => !existingIds.has(String(item._id)),
            );
            return [...prev, ...uniqueIncoming];
          });
        }

        if (Number(visit) === 1) {
          if (typeof data?.publishedCount === 'number') {
            setPublishedLabel(`Published(${data.publishedCount})`);
          }

          if (typeof data?.progressCount === 'number') {
            setProgressLabel(`Progress(${data.progressCount})`);
          }

          if (typeof data?.discardCount === 'number') {
            setDiscardLabel(`Discarded(${data.discardCount})`);
          }

          setVisit(0);
        }

        return incomingArticles;
      } catch (err) {
        return [];
      }
    },
    enabled: !!page && !isGuest && user_token !== '' && user_token !== null,
  });
};
