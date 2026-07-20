import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SAVE_ARTICLE } from "../helper/APIUtils";
import axios from "axios";
type AxiosError = any;


export const useSaveArticle = (articleId: number): UseMutationResult<
 any,
 AxiosError, void>=>{

    return useMutation({
    mutationKey: [`update-save-article`, articleId],
    mutationFn: async () => {
  
      const res = await axios.post(
        SAVE_ARTICLE,
        {
          article_id: articleId,
        },
      );

      return res.data as any;
    },

  });
}