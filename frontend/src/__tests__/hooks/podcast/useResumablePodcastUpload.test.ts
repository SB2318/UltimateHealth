import axios from 'axios';
import { renderHook, act } from '@testing-library/react-native';
import { useResumablePodcastUpload } from '@/src/hooks/podcast/useResumablePodcastUpload';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useResumablePodcastUpload', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates session, uploads chunks sequentially, and completes upload', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { uploadId: 'sess_123', chunkSize: 5242880, expiresAt: '2026-12-31' },
    });
    mockedAxios.put.mockResolvedValue({ data: { success: true } });
    mockedAxios.post.mockResolvedValueOnce({
      data: { podcastId: 'pod_999', title: 'Test Podcast' },
    });

    const { result } = renderHook(() => useResumablePodcastUpload());

    const chunks = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])];

    let uploadResult: any;
    await act(async () => {
      uploadResult = await result.current.startOrResumeUpload({
        title: 'Test Podcast',
        fileName: 'podcast.mp3',
        fileSize: 10485760,
        mimeType: 'audio/mpeg',
        chunks,
      });
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.isUploading).toBe(false);
    expect(uploadResult.podcastId).toBe('pod_999');
    expect(mockedAxios.put).toHaveBeenCalledTimes(2);
  });

  it('resumes upload from last missing chunk without re-uploading completed chunks', async () => {
    const { result } = renderHook(() => useResumablePodcastUpload());
    const chunks = [new Uint8Array([1]), new Uint8Array([2])];

    mockedAxios.post.mockResolvedValueOnce({
      data: { uploadId: 'sess_existing', chunkSize: 5242880, expiresAt: '2026-12-31' },
    });
    mockedAxios.put.mockRejectedValueOnce(new Error('Network Interrupted'));

    await act(async () => {
      try {
        await result.current.startOrResumeUpload({
          title: 'Resumed Podcast',
          fileName: 'podcast.mp3',
          fileSize: 10485760,
          mimeType: 'audio/mpeg',
          chunks,
        });
      } catch (e) {}
    });

    expect(result.current.uploadId).toBe('sess_existing');

    mockedAxios.get.mockResolvedValueOnce({
      data: { uploadedChunks: [1], progress: 50 },
    });
    mockedAxios.put.mockResolvedValueOnce({ data: { success: true } });
    mockedAxios.post.mockResolvedValueOnce({
      data: { podcastId: 'pod_999', title: 'Resumed Podcast' },
    });

    await act(async () => {
      await result.current.startOrResumeUpload({
        title: 'Resumed Podcast',
        fileName: 'podcast.mp3',
        fileSize: 10485760,
        mimeType: 'audio/mpeg',
        chunks,
      });
    });

    expect(mockedAxios.put).toHaveBeenCalledTimes(2);
  });

  it('cancels upload and clears state', async () => {
    const { result } = renderHook(() => useResumablePodcastUpload());

    mockedAxios.post.mockResolvedValueOnce({
      data: { uploadId: 'sess_cancel', chunkSize: 5242880, expiresAt: '2026-12-31' },
    });
    mockedAxios.put.mockResolvedValueOnce({ data: { success: true } });
    mockedAxios.post.mockResolvedValueOnce({ data: { podcastId: 'pod_cancel' } });

    await act(async () => {
      await result.current.startOrResumeUpload({
        title: 'Cancel Me',
        fileName: 'cancel.mp3',
        fileSize: 5000,
        mimeType: 'audio/mpeg',
        chunks: [new Uint8Array([1])],
      });
    });

    expect(result.current.uploadId).toBe('sess_cancel');

    mockedAxios.delete.mockResolvedValueOnce({ data: { cancelled: true } });

    await act(async () => {
      await result.current.cancelUpload();
    });

    expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining('sess_cancel'));
    expect(result.current.uploadId).toBeNull();
    expect(result.current.progress).toBe(0);
  });
});
