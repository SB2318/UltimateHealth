import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Character } from "../type";
import axios from "axios";
import { GET_CHARACTERS_API } from "../helper/APIUtils";
type AxiosError = any;

export const useGetCharacters = (isConnected: boolean): UseQueryResult<
  Character[],
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-ai-characters'],
    queryFn: async () => {
      const response = await axios.get(`${GET_CHARACTERS_API}`);
      return response.data as Character[];
    },
    enabled: !!isConnected
  });
};
