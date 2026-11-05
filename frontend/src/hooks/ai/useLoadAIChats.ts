import { CHAT_URL } from "@/src/lib/api/APIUtils";
import { Message } from "@/src/schemas/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAppSelector } from "@/src/store/hooks";
import { RootState } from "@/src/store/ReduxStore";
import authAxios from "@/src/lib/api/authAxios";
import axios from "axios";

type AxiosError = any;

export const useLoadAIConversations = (
  characterIdOrConnected?: string | boolean,
  characterId?: string,
): UseQueryResult<Message[], AxiosError> => {
  const userId = useAppSelector((state: RootState) => state.user.user_id);
  const reduxConnected = useAppSelector((state: RootState) => state.network?.isConnected ?? true);

  const resolvedCharacterId = typeof characterIdOrConnected === 'string'
    ? characterIdOrConnected
    : characterId;

  const resolvedConnected = typeof characterIdOrConnected === 'boolean'
    ? characterIdOrConnected
    : reduxConnected;

  return useQuery({
    queryKey: ['load-user-conversations', userId || 'anonymous', resolvedCharacterId],
    queryFn: async () => {
      try {
        const url = resolvedCharacterId
          ? `${CHAT_URL}?character=${resolvedCharacterId}`
          : `${CHAT_URL}`;

        let response;
        try {
          response = await authAxios.get(url, { timeout: 15000 });
        } catch {
          response = await axios.get(url, { timeout: 15000 });
        }

        const data = response?.data;
        const messages =
          data?.messages ??
          data?.data ??
          data?.conversations ??
          data?.history ??
          (Array.isArray(data) ? data : []);

        return (messages ?? []) as Message[];
      } catch {
        return [];
      }
    },
    enabled: Boolean(resolvedConnected !== false),
    staleTime: 0,       // always treat cached result as stale → refetch on mount
    gcTime: 0,          // don't keep empty-array result in memory across navigations
    refetchOnMount: true,
    retry: 1,
  });
};
