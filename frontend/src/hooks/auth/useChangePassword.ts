import { CHANGE_PASSWORD_API } from "@/src/helper/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";


type AxiosError = any;

type ChangePasswordReq = {
    email: string;
    newPassword: string;
    resetToken: string;
};

export const useChangePasswordMutation = (): UseMutationResult<
    any,
    AxiosError,
    ChangePasswordReq
> => {
    return useMutation({
        mutationKey: ["generate-new-password"],
        mutationFn: async (req: ChangePasswordReq) => {
            const res = await axios.post(CHANGE_PASSWORD_API, {
                email: req.email,
                newPassword: req.newPassword,
                resetToken: req.resetToken,
            });

            return res.data;
        },
    });
};