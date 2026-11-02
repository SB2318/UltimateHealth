import { useState } from 'react';
import { Alert } from 'react-native';
import { getMimeTypes } from '../../lib/utils/Utils';
import { UPLOAD_STORAGE } from '../../lib/api/APIUtils';
import { uploadMediaFile } from '../../lib/api/uploadMediaHelper';

const useUploadAudio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uploadAudio = async (uri: string) => {
    try {
      setLoading(true);

      let filename = uri.split('/').pop() || `audio_${Date.now()}`;
      
      if (!filename.includes('.')) {
        filename += '.wav';
      }
      let match = /\.(\w+)$/.exec(filename);
      let ext = match ? match[1].toLowerCase() : 'wav';

      let type = getMimeTypes(ext) || `audio/${ext}`;

      // If still unknown, default to WAV
      if (!type || type === 'application/octet-stream') {
        type = 'audio/wav';
      }

      if (__DEV__) console.log(`Uploading audio: ${filename} (${type})`);

      const data = await uploadMediaFile(UPLOAD_STORAGE, {
        uri,
        filename,
        type,
        fieldName: 'file',
      });

      if (__DEV__) console.log('Audio upload response:', data);
      setError(false);
      return (data.key || data.url || data) as string;
    } catch (err: any) {
      if (__DEV__) console.log('Audio upload failed', err);
      Alert.alert(
        'Upload Failed',
        err?.message || 'Unable to upload audio. Please check your connection.',
      );
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAudio, loading, error };
};

export default useUploadAudio;
