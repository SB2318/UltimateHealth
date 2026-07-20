import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
import {USER_LOGOUT} from '../helper/APIUtils';
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
