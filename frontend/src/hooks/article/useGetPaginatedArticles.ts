import { PROD_URL } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {Platform} from 'react-native';
import {demoArticles} from '../../lib/demo/demoContent';



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
      if (Platform.OS === 'web') {
        return {articles: demoArticles, totalPages: 1};
      }
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
    enabled: (Platform.OS === 'web' || !!isConnected) && !!page,
  });
};
