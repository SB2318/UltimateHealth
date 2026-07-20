import { GET_CHARACTERS_API } from "@/src/helper/APIUtils";
import { Character } from "@/src/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import axios from "axios";

type AxiosError = any;


export const useGetCharacters = (isConnected: boolean): UseQueryResult<
  Character[],
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-ai-characters'],
    queryFn: async () => {
      const response = await axios.get(`${GET_CHARACTERS_API}`);
      return response.data?.characters as Character[];
    },
    enabled: !!isConnected
  });
};
