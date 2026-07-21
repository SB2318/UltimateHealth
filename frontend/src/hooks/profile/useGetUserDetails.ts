import { useQuery, UseQueryResult } from "@tanstack/react-query";
<<<<<<< HEAD:frontend/src/hooks/useGetUserDetails.ts
import axios, { AxiosError } from "axios";
import { User } from "../type";
import { GET_USER_DETAILS_API } from "../helper/APIUtils";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
=======
import axios from "axios";
import { User } from "../../schemas/type";
import { GET_USER_DETAILS_API } from "../../lib/api/APIUtils";
import { useSelector } from "react-redux";
type AxiosError = any;
>>>>>>> upstream/main:frontend/src/hooks/profile/useGetUserDetails.ts

export const useGetUserDetails = (isConnected: boolean): UseQueryResult<
User,
AxiosError
>=>{
    const isGuest = useAppSelector(state => state.user.isGuest);
   
    return useQuery({
    queryKey: ['get-user-details-by-id'],
    queryFn: async () => {
      const response = await axios.get(`${GET_USER_DETAILS_API}`);

      return response.data.profile as User;
    },
    enabled: !!isConnected && !isGuest,
  });
}