import { UPDATE_USER_PASSWORD } from "@/src/lib/api/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
type AxiosError = any;

type UpdateReq = {
    old_password: string;
    new_password: string;
}
export const useUpdatePassword = (): UseMutationResult<
 any,
 AxiosError,
 UpdateReq
>=>{

    return useMutation({
    mutationKey: ['user-password-updation'],
    mutationFn: async (req: UpdateReq) => {
      const response = await axios.put(
        `${UPDATE_USER_PASSWORD}`,
        {
          old_password: req.old_password,
          new_password: req.new_password,
        },
      );
      return response.data as any;
    },
  });
}