import { CHAT_URL } from "@/src/lib/api/APIUtils";
import { Message } from "@/src/schemas/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAppSelector } from "@/src/store/hooks";
import { RootState } from "@/src/store/ReduxStore";
import axios from "axios";

type AxiosError = any;


export const useLoadAIConversations = (isConnected: boolean, characterId?: string): UseQueryResult<
Message[],
AxiosError
>=>{
    const userId = useAppSelector((state: RootState) => state.user.user_id);
    return useQuery({
    queryKey: ['load-user-conversations', userId, characterId],
    queryFn: async () => {
      const url = characterId ? `${CHAT_URL}?character=${characterId}` : `${CHAT_URL}`;
      const response = await axios.get(url);
      return response.data.messages as Message[];
    },
    enabled: !!isConnected
  });
}