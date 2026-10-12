import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
import {GOOGLE_AUTH_API} from '../../lib/api/APIUtils';
import {User} from '../../schemas/type';

type AxiosError = any;

type GoogleAuthReq = {
  idToken: string;
  role: 'General User' | 'Doctor';
  email?: string;
  uid?: string;
  user_name?: string;
  user_handle?: string;
  isDoctor?: boolean;
  Profile_image?: string;
  qualification?: string;
  specialization?: string;
  Years_of_experience?: string | number;
  contact_detail?: string;
  fcmToken?: string;
};

export type GoogleAuthResponse = {
  user?: User;
  token?: string;
  refreshToken?: string;
  newUser?: boolean;
  message?: string;
  doctorProfileIncomplete?: boolean;
};


const googleAuthFunc = async (req: GoogleAuthReq): Promise<GoogleAuthResponse> => {
  const { idToken, role, ...bodyData } = req;

  console.log('\n======================================================');
  console.log('🚀 [GOOGLE AUTH API] Mutating /user/google-auth');
  console.log('📍 Endpoint Path: /user/google-auth');
  console.log('🔑 Authorization Header: Bearer ' + (idToken ? idToken.substring(0, 20) + '...' : 'MISSING'));
  console.log('📱 Header x-client-type: mobile');
  console.log('📦 Request Body Payload:', JSON.stringify(bodyData, null, 2));
  console.log('======================================================\n');

  const res = await axios.post(
    GOOGLE_AUTH_API,
    bodyData,
    {
      headers: {
        'x-client-type': 'mobile',
        'Authorization': `Bearer ${idToken}`,
      },
    },
  );

  console.log('✅ [GOOGLE AUTH API] Response Received:', JSON.stringify(res.data, null, 2));
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
