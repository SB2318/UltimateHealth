import { CHECK_OTP } from "@/src/lib/api/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

type AxiosError = any;

export interface VerifyOtpResponse {
    message: string;
    resetToken: string;
}

type VerifyReq = {
    email: string;
    otp: string;
};

export const useVerifyOtpMutation = (): UseMutationResult<
    VerifyOtpResponse,
    AxiosError,
    VerifyReq
> => {
    return useMutation({
        mutationKey: ["verify-otp"],
        mutationFn: async (req: VerifyReq) => {
            const res = await axios.post(CHECK_OTP, {
                email: req.email,
                otp: req.otp,
            });

            return res.data as VerifyOtpResponse;
        },
    });
};