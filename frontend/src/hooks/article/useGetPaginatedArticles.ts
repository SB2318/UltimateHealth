import { PROD_URL } from '@/src/helper/APIUtils';
import { ArticleData } from '@/src/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';



type AxiosError = any;

type ArticleRes = {
  articles: ArticleData[];
  totalPages: number;
};
export const useGetPaginatedArticle = (
  isConnected: boolean,
  page: number,
): UseQueryResult<ArticleRes, AxiosError> => {
  return useQuery({
    queryKey: ['get-all-articles', page],
    queryFn: async () => {
      try {
       // const token = await secureRetrieveItem(SECURE_KEYS.USER_TOKEN);
       // console.log('token: ', token);
         console.log('response url: ', `${PROD_URL}/articles?page=${page}`);
        const response = await axios.get(`${PROD_URL}/articles?page=${page}`);
       
        return response.data as ArticleRes;
      } catch (err) {
        console.error('Error fetching articles:', err);
        return null;
      }
    },
    enabled: !!isConnected && !!page,
  });
};
