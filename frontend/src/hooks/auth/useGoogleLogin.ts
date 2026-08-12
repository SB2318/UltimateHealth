// @ts-nocheck
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { GOOGLE_AUTH_API } from '../../lib/api/APIUtils';
import { LoginResponse } from './useUserLogin';

type AxiosError = any;

export type GoogleLoginReq = {
  idToken: string;
  fcmToken?: string;
};

const googleLoginFunc = async ({
  idToken,
  fcmToken,
}: GoogleLoginReq): Promise<LoginResponse> => {
  const res = await axios.post(
    GOOGLE_AUTH_API,
    {
      idToken,
      fcmToken,
    },
    {
      headers: {
        'x-client-type': 'mobile',
      },
    }
  );

  if (__DEV__) {
    console.log('[GoogleLogin] Raw API response keys:', Object.keys(res.data || {}));
    console.log('[GoogleLogin] res.data.token:', res.data?.token ? 'present' : 'absent');
  }

  const responseData = res.data?.data ?? res.data;
  return responseData as LoginResponse;
};

export const useGoogleLoginMutation = (): UseMutationResult<
  LoginResponse,
  AxiosError,
  GoogleLoginReq
> => {
  return useMutation({
    mutationKey: ['user_google_login'],
    mutationFn: googleLoginFunc,
  });
};
