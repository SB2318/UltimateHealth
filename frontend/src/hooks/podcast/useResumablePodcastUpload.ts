// @ts-nocheck
import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  PODCAST_UPLOAD_SESSION_API,
  PODCAST_UPLOAD_CHUNK_API,
  PODCAST_UPLOAD_STATUS_API,
  PODCAST_UPLOAD_COMPLETE_API,
  PODCAST_UPLOAD_CANCEL_API,
} from '../../lib/api/APIUtils';

export interface UploadSessionResponse {
  uploadId: string;
  chunkSize: number;
  expiresAt: string;
}

export interface UploadStatusResponse {
  uploadedChunks: number[];
  progress: number;
}

export interface ResumableUploadOptions {
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  chunks: Blob[] | Uint8Array[];
  chunkSize?: number;
}

export const useResumablePodcastUpload = () => {
  const [progress, setProgress] = useState<number>(0);
  const [uploadIdState, setUploadIdState] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const uploadIdRef = useRef<string | null>(null);

  const updateUploadId = (id: string | null) => {
    uploadIdRef.current = id;
    setUploadIdState(id);
  };

  const startOrResumeUpload = useCallback(
    async (options: ResumableUploadOptions) => {
      setIsUploading(true);
      setError(null);
      try {
        let currentUploadId = uploadIdRef.current;
        let uploadedChunks: number[] = [];

        // 1. Create upload session if not exists
        if (!currentUploadId) {
          const sessionRes = await axios.post(PODCAST_UPLOAD_SESSION_API, {
            title: options.title,
            description: options.description,
            fileName: options.fileName,
            fileSize: options.fileSize,
            mimeType: options.mimeType,
            totalChunks: options.chunks.length,
          });
          const sessionData: UploadSessionResponse = sessionRes.data?.data ?? sessionRes.data;
          currentUploadId = sessionData.uploadId;
          updateUploadId(currentUploadId);
        } else {
          // Check existing session status for resume
          const statusRes = await axios.get(PODCAST_UPLOAD_STATUS_API(currentUploadId));
          const statusData: UploadStatusResponse = statusRes.data?.data ?? statusRes.data;
          uploadedChunks = statusData.uploadedChunks || [];
        }

        const totalChunks = options.chunks.length;

        // 2. Upload missing chunks
        for (let i = 0; i < totalChunks; i++) {
          const chunkNumber = i + 1;
          if (uploadedChunks.includes(chunkNumber)) {
            continue; // Skip already uploaded chunk
          }

          const chunkData = options.chunks[i];
          await axios.put(
            PODCAST_UPLOAD_CHUNK_API(currentUploadId, chunkNumber),
            chunkData,
            {
              headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Range': `bytes ${i * (options.chunkSize || 5242880)}-${
                  (i + 1) * (options.chunkSize || 5242880) - 1
                }/${options.fileSize}`,
              },
            }
          );

          uploadedChunks.push(chunkNumber);
          const currentProgress = Math.round((uploadedChunks.length / totalChunks) * 100);
          setProgress(currentProgress);
        }

        // 3. Finalize upload
        const completeRes = await axios.post(
          PODCAST_UPLOAD_COMPLETE_API(currentUploadId),
          {
            fileName: options.fileName,
            fileSize: options.fileSize,
          }
        );

        setIsUploading(false);
        return completeRes.data?.data ?? completeRes.data;
      } catch (err: any) {
        setIsUploading(false);
        setError(err);
        throw err;
      }
    },
    []
  );

  const cancelUpload = useCallback(async () => {
    const currentUploadId = uploadIdRef.current || uploadIdState;
    if (!currentUploadId) return;
    try {
      await axios.delete(PODCAST_UPLOAD_CANCEL_API(currentUploadId));
      updateUploadId(null);
      setProgress(0);
      setIsUploading(false);
    } catch (err: any) {
      setError(err);
      throw err;
    }
  }, [uploadIdState]);

  return {
    uploadId: uploadIdRef.current || uploadIdState,
    progress,
    isUploading,
    error,
    startOrResumeUpload,
    cancelUpload,
  };
};
