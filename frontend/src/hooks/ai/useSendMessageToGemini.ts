import { SEND_MESSAGE_TO_GEMINI } from '@/src/lib/api/APIUtils';
import { Message } from '@/src/schemas/type';
import {useMutation, UseMutationResult} from '@tanstack/react-query';

import axios from 'axios';
type AxiosError = any;

export const useSendMessageToGemini = (): UseMutationResult<
  Message,
  AxiosError,
  { text: string; character?: string }
> => {
  return useMutation({
    mutationKey: ['chatbot-response'],
    mutationFn: async ({ text, character }: { text: string; character?: string }) => {
      const payload = character ? { text, character } : { text };
      const response = await axios.post(`${SEND_MESSAGE_TO_GEMINI}`, payload);
      return response.data.message as Message;
    },
  });
};
