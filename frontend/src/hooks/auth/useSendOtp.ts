import { SEND_OTP } from "@/src/lib/api/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
type AxiosError = any;

export const useSendOtpMutation = (): UseMutationResult<
  void,
  AxiosError,
  {email: string}
> => {
    return useMutation({
    mutationKey: ['forgot-password-otp'],
    mutationFn: async ({email}: {email: string}) => {
      const res = await axios.post(SEND_OTP, {
        email: email,
      });
      void res;
    },
  });
};