import { UPDATE_READ_EVENT } from "@/src/lib/api/APIUtils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
type AxiosError = any;

export const useUpdateReadEvent = (articleId: number): UseMutationResult<
any,
AxiosError
>=>{
   
    return useMutation({
    mutationKey: ['update-read-event-status', articleId],

    mutationFn: async () => {
 
      const res = await axios.post(
        UPDATE_READ_EVENT,
        {
          article_id: articleId,
        }
      );
      return res.data as any;
    }
  });
}