import { CHAT_URL } from "@/src/lib/api/APIUtils";
import { Message } from "@/src/schemas/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAppSelector } from "@/src/store/hooks";
import { RootState } from "@/src/store/ReduxStore";
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
    queryKey: ['load-user-conversations', userId, resolvedCharacterId],
    queryFn: async () => {
      try {
        const url = resolvedCharacterId
          ? `${CHAT_URL}?character=${resolvedCharacterId}`
          : `${CHAT_URL}`;
        const response = await axios.get(url, { timeout: 15000 });
        console.log("useLoadAIConversations response:", response, url);
        return (response?.data?.messages ?? []) as Message[];
      } catch {
        return [];
      }
    },
    enabled: Boolean(resolvedConnected !== false && userId),
  });
};
