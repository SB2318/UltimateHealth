import {useState} from 'react';
import {Alert} from 'react-native';
import {UPLOAD_STORAGE} from '../../lib/api/APIUtils';
import {uploadMediaFile} from '../../lib/api/uploadMediaHelper';

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      // Extract filename and type
      let filename: string = uri.split('/').pop() || `image_${Date.now()}`;
      let match = /\.(\w+)$/.exec(filename);
      let ext = match ? match[1].toLowerCase() : 'jpeg';
      let type = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;

      if (__DEV__) console.log('Uploading image:', filename, type);

      const data = await uploadMediaFile(UPLOAD_STORAGE, {
        uri,
        filename,
        type,
        fieldName: 'file',
      });

      if (__DEV__) console.log('Image upload response:', data);
      setError(false);
      return (data.key || data.url || data) as string;
    } catch (err: any) {
      if (__DEV__) console.log('Image upload failed', err);
      Alert.alert(
        'Upload Failed',
        err?.message || 'Failed to upload image. Please check your connection.',
      );
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {uploadImage, loading, error};
};

export default useUploadImage;
