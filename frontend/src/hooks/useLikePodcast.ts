import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCallback, useRef } from "react";
import { LIKE_PODCAST } from "../helper/APIUtils";
import { useSelector } from "react-redux";

type PodcastMutationVariables = string;
type MutationOptions = Parameters<
  UseMutationResult<any, AxiosError, PodcastMutationVariables>["mutate"]
>[1];

export const useLikePodcast = (): UseMutationResult<
  any,
  AxiosError,
  PodcastMutationVariables
> => {
  const isGuest = useSelector((state: any) => state.user.isGuest);

  const mutation = useMutation({
    mutationKey: ["update-podcast-like-count"],
    mutationFn: async (podcastId: string) => {
      if (isGuest) {
        return Promise.reject(new Error("Guest cannot like podcasts"));
      }
      const res = await axios.post(
        `${LIKE_PODCAST}`,
        {
          podcast_id: podcastId,
        },
      );
      return res.data as any;
    },
  });

  // Guard against rapid taps: only one like/unlike request may be in flight
  // at a time per hook instance (fixes #1934 race condition).
  const inFlightRef = useRef(false);

  const guardedMutate = useCallback(
    (
      variables: PodcastMutationVariables,
      options?: MutationOptions,
    ) => {
      if (inFlightRef.current) {
        return;
      }
      inFlightRef.current = true;
      mutation.mutate(variables, {
        ...options,
        onSettled: (data, error, vars, context) => {
          inFlightRef.current = false;
          options?.onSettled?.(data, error, vars, context);
        },
      });
    },
    [mutation],
  );

  return {...mutation, mutate: guardedMutate};
};