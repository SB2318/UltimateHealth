import axios from 'axios';
import {User} from '../../schemas/type';
import {PROD_URL} from '../../lib/api/APIUtils';
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
      if (__DEV__) {
        // Log only safe profile metadata. The full User payload can contain
        // email, password, refreshToken, otp and contact_detail.phone_no, so
        // it must never be dumped to logs in any build.
        const profile = response.data?.data as User | undefined;
        console.log('[useGetAuthorProfile] user_id:', profile?._id);
        console.log('[useGetAuthorProfile] user_handle:', profile?.user_handle);
        console.log('[useGetAuthorProfile] user_name:', profile?.user_name);
        console.log(
          '[useGetAuthorProfile] hasProfileImage:',
          typeof profile?.Profile_image === 'string' &&
            profile.Profile_image.length > 0,
        );
      }
      return response.data.data as User;
    },
    enabled: !!isConnected
  });
};
