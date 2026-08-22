import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
import {GOOGLE_AUTH_API} from '../../lib/api/APIUtils';
import {User} from '../../schemas/type';

type AxiosError = any;

type GoogleAuthReq = {
  idToken: string;
  role: 'General User' | 'Doctor';
};

export type GoogleAuthResponse = {
  user?: User;
  token?: string;
  refreshToken?: string;
  newUser?: boolean;
  message?: string;
  doctorProfileIncomplete?: boolean;
};

const googleAuthFunc = async ({
  idToken,
  role,
}: GoogleAuthReq): Promise<GoogleAuthResponse> => {
  const res = await axios.post(
    GOOGLE_AUTH_API,
    {
      idToken,
      role,
    },
    {
      headers: {
        'x-client-type': 'mobile',
      },
    },
  );

  const responseData = res.data?.data ?? res.data;
  return responseData as GoogleAuthResponse;
};

export const useGoogleAuthMutation = (): UseMutationResult<
  GoogleAuthResponse,
  AxiosError,
  GoogleAuthReq
> => {
  return useMutation({
    mutationKey: ['google_auth'],
    mutationFn: googleAuthFunc,
  });
};
