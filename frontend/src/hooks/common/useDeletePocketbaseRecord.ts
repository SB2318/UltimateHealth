import { DELETE_POCKETBASE_RECORD } from '@/src/helper/APIUtils';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';

type AxiosError = any;

/**
 * Compensating-delete hook.
 *
 * Sends DELETE /upload-pocketbase/record/:recordId to remove an orphaned
 * PocketBase record when the downstream main-DB write fails.
 *
 * The mutation is fire-and-forget from the caller's perspective: a failure
 * here is logged but does NOT re-surface an alert to the user (they already
 * saw the primary failure message). Server-side, the orphan cleanup can be
 * retried via a scheduled job if this call itself fails.
 */
export const useDeletePocketbaseRecord = (): UseMutationResult<
  void,
  AxiosError,
  { recordId: string; collectionName: string }
> => {
  return useMutation({
    mutationKey: ['delete-pocketbase-record'],
    mutationFn: async ({ recordId, collectionName }: { recordId: string; collectionName: string }) => {
      await axios.delete(`${DELETE_POCKETBASE_RECORD}/${collectionName}/${recordId}`);
    },
  });
};
