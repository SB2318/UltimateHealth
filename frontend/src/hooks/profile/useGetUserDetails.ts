import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../schemas/type";
import { GET_USER_DETAILS_API } from "../../lib/api/APIUtils";
import { useAppSelector } from "../../store/hooks";
type AxiosError = any;

export const useGetUserDetails = (isConnected: boolean): UseQueryResult<
User | null,
AxiosError
> => {
    const isGuest = useAppSelector(state => state.user.isGuest);
    const user_token = useAppSelector(state => state.user.user_token);
   
    return useQuery({
    queryKey: ['get-user-details-by-id'],
    queryFn: async () => {
      const response = await axios.get(`${GET_USER_DETAILS_API}`);
      const profile = response?.data?.data ?? response?.data?.profile ?? response?.data ?? null;
      return (profile ?? null) as User | null;
    },
    enabled: !!isConnected && !isGuest && Boolean(user_token),
  });
};
