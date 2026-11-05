import { SEND_MESSAGE_TO_GEMINI } from '@/src/lib/api/APIUtils';
import { Message } from '@/src/schemas/type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

type AxiosError = any;

export const useSendMessageToGemini = (): UseMutationResult<
  Message,
  AxiosError,
  { text: string; character?: string; language?: string }
> => {
  return useMutation({
    mutationKey: ['chatbot-response'],
    mutationFn: async ({
      text,
      character,
      language,
    }: {
      text: string;
      character?: string;
      language?: string;
    }) => {
      const payload: Record<string, any> = { text };
      if (character) payload.character = character;
      if (language) payload.language = language;
      const response = await axios.post(`${SEND_MESSAGE_TO_GEMINI}`, payload, {
        timeout: 60000, // 60s timeout for LLM inference to prevent false network timeout errors
      });
      return response.data.message as Message;
    },
  });
};
