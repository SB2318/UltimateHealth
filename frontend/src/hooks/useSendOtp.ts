import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {SEND_OTP} from '../helper/APIUtils';
interface SendOtpPayload {
  email: string;
}
export const useSendOtpMutation = (): UseMutationResult<
  any,
  AxiosError,
  SendOtpPayload, // The variables passed to the mutate function
  unknown
> => {
  return useMutation({
    mutationFn: async (payload: SendOtpPayload) => {
      const response = await axios.post(SEND_OTP, payload);
      return response.data;
    },
  });
};
