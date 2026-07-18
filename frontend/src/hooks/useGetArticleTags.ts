import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {ARTICLE_TAGS_API} from '../helper/APIUtils';
import {Category} from '../type';
type AxiosError = any;

const categoryFunc = async () => {
  const {data: categoryData} = await axios.get(ARTICLE_TAGS_API);
  return categoryData as Category[];
};

export const useGetCategories = (isConnected: boolean): UseQueryResult<
  Category[],
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-categories'],
    queryFn: categoryFunc,
    enabled: isConnected
  });
};
