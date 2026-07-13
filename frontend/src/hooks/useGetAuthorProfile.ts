import axios from 'axios';
import {User} from '../type';
import {PROD_URL} from '../helper/APIUtils';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
type AxiosError = any;

export const useGetAuthorProfile = (
  authorId: string,
  author_handle: string | undefined,
  user_id: string,
  isConnected: boolean
): UseQueryResult<User | undefined, AxiosError> => {
  const cleanHandle = author_handle?.startsWith('@') ? author_handle.slice(1) : author_handle;
  return useQuery({
    queryKey: ['get-user-profile', authorId, cleanHandle, user_id],
    queryFn: async () => {
      let url: string;
      if (authorId) {
        url = `${PROD_URL}/user/getuserprofile?id=${authorId}`;
      } else if (cleanHandle) {
        url = `${PROD_URL}/user/getuserprofile?handle=${cleanHandle}&user_handle=${cleanHandle}&username=${cleanHandle}`;
      } else {
        url = `${PROD_URL}/user/getuserprofile?id=${user_id}`;
      }
      const response = await axios.get(url);
      console.log("Fetched author profile:", response.data);
      return response.data.data as User;
    },
    enabled: !!isConnected
  });
};
