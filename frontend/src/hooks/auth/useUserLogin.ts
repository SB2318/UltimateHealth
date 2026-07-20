// @ts-nocheck
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
import {LOGIN_API} from '../../helper/APIUtils';
import {User} from '../../type';
type AxiosError = any;

type LoginReq = {
  email: string;
  password: string;
  fcmToken: string;
};

// Full shape of what the backend /user/login endpoint returns.
// The token lives at the TOP level of the response, NOT inside the user object.
export type LoginResponse = {
  user: User;
  token?: string;           // access / JWT token (primary)
  refreshToken?: string;    // refresh token (fallback field name)
  accessToken?: string;     // some backends use this name
  message?: string;
};

const loginFunc = async ({email, password, fcmToken}: LoginReq): Promise<LoginResponse> => {
  const res = await axios.post(LOGIN_API, {
    email,
    password,
    fcmToken,
  }, {
    headers: {
      'x-client-type': 'mobile',
    },
  });

  if (__DEV__) {
    // Log the raw response shape so we can confirm the token field name
    console.log('[Login] Raw API response keys:', Object.keys(res.data || {}));
    console.log('[Login] res.data.token:', res.data?.token);
    console.log('[Login] res.data.refreshToken:', res.data?.refreshToken);
    console.log('[Login] res.data.user?.refreshToken:', res.data?.user?.refreshToken);
    console.log('[Login] res.data.data keys:', res.data?.data ? Object.keys(res.data.data) : null);
  }

  // The backend now wraps the response inside an extra "data" object.
  // res.data is from Axios. res.data.data is from the backend response envelope.
  const responseData = res.data?.data ?? res.data;

  // Return the unwrapped response so LoginScreen can pick up the token
  return responseData as LoginResponse;
};

export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  AxiosError,
  LoginReq
> => {
  return useMutation({
    mutationKey: ['user_login'],
    mutationFn: loginFunc,
  });
};
