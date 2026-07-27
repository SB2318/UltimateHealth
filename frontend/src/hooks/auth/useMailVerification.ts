import { VERIFICATION_MAIL_API } from "@/src/lib/api/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
type AxiosError = any;

type VerificationReq = {
    email: string;
    token: string
}
export const useVerificationMailMutation = (): UseMutationResult<
  string,
  AxiosError,
  VerificationReq
  
>=>{
   return useMutation({
    mutationKey: ['send-verification-mail'],
    mutationFn: async (req: VerificationReq) => {
      const res = await axios.post(VERIFICATION_MAIL_API, {
        email: req.email,
        token: req.token,
      });

      return res.data.message as string;
    },
  });
}