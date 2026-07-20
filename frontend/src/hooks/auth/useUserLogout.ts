import { USER_LOGOUT } from '@/src/helper/APIUtils';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
type AxiosError = any;

export const useUserLogout = (): UseMutationResult<any, AxiosError, void> => {
  return useMutation({
    mutationKey: ['user-logout'],
    mutationFn: async () => {
      const response = await axios.post(`${USER_LOGOUT}`, {});
      return response.data as any;
    },
  });
};
