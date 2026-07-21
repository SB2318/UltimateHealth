
import { GET_TOTAL_WRITES } from "@/src/lib/api/APIUtils";
import { WriteStatus } from "@/src/schemas/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
<<<<<<< HEAD:frontend/src/hooks/useGetTotalWrites.ts
import { WriteStatus } from "../type";
import { GET_TOTAL_WRITES } from "../helper/APIUtils";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
=======

import { useSelector } from "react-redux";
>>>>>>> upstream/main:frontend/src/hooks/analytics/useGetTotalWrites.ts

export const useGetTotalWrites = (
 {
 user_id,
 userId,
 others,
 isConnected
 }:{
  user_id: string;
  userId?: string;
  others?: boolean;
  isConnected?: boolean
 }
): UseQueryResult<WriteStatus> => {
  const isGuest = useAppSelector(state => state.user.isGuest);

  return useQuery<WriteStatus>({
    queryKey: ["get-total-writes", user_id, userId, others],

    queryFn: async () => {
   
      const url = others
        ? `${GET_TOTAL_WRITES}${userId}`
        : `${GET_TOTAL_WRITES}${user_id}`;

      const response = await axios.get(url);

      return response.data as WriteStatus;
    },

    enabled: !!isConnected && (others ? !!userId : (!isGuest && !!user_id)),
  });
};