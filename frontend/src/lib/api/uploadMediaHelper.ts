import { Platform } from 'react-native';

export interface UploadMediaOptions {
  uri: string;
  filename: string;
  type: string;
  fieldName?: string;
}

/**
 * Uploads a local media file (image/audio) to the given endpoint.
 * Bypasses Expo's strict WinterCG fetch parser (which throws "Unsupported FormDataPart implementation"
 * when given standard React Native { uri, name, type } objects) by using native XMLHttpRequest
 * or FileSystem uploadAsync fallbacks.
 */
export async function uploadMediaFile(
  url: string,
  options: UploadMediaOptions,
): Promise<{ key?: string; url?: string; [key: string]: any }> {
  const { uri, filename, type, fieldName = 'file' } = options;

  // Format URI properly for platform
  const fileUri =
    Platform.OS === 'android' &&
    !uri.startsWith('content://') &&
    !uri.startsWith('file://')
      ? `file://${uri}`
      : uri;

  // Primary method: XMLHttpRequest
  // In React Native, XMLHttpRequest bypasses expo/fetch completely and delegates
  // multipart streaming directly to native Android (OkHttp) and iOS (NSURLSession).
  try {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.timeout = 60000; // 60s timeout for media uploads

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            resolve(json);
          } catch {
            resolve({ key: xhr.responseText });
          }
        } else {
          reject(
            new Error(
              `Upload failed with status ${xhr.status}: ${xhr.responseText}`,
            ),
          );
        }
      };

      xhr.onerror = () => {
        reject(
          new Error(
            'Network request failed during file upload. Please check your connection.',
          ),
        );
      };

      xhr.ontimeout = () => {
        reject(
          new Error(
            'Upload timed out after 60 seconds. Please try again.',
          ),
        );
      };

      const formData = new FormData();
      formData.append(fieldName, {
        uri: fileUri,
        name: filename,
        type: type,
      } as any);

      xhr.send(formData);
    });
  } catch (xhrError) {
    if (__DEV__) {
      console.log('XHR upload failed, attempting fallback...', xhrError);
    }

    // Fallback 1: expo-file-system legacy uploadAsync
    try {
      const FileSystem = require('expo-file-system/legacy');
      if (FileSystem?.uploadAsync && FileSystem?.UploadType) {
        const uploadResult = await FileSystem.uploadAsync(url, fileUri, {
          fieldName,
          httpMethod: 'POST',
          uploadType: FileSystem.UploadType.MULTIPART,
        });
        if (uploadResult.status >= 200 && uploadResult.status < 300) {
          try {
            return JSON.parse(uploadResult.body);
          } catch {
            return { key: uploadResult.body };
          }
        }
      }
    } catch (fsErr) {
      if (__DEV__) console.log('FileSystem fallback failed', fsErr);
    }

    // Fallback 2: expo-file-system File with fetch
    try {
      const { File } = require('expo-file-system');
      const fileObj = new File(fileUri);
      const formData = new FormData();
      formData.append(fieldName, fileObj as any);

      const resp = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (resp.ok) {
        return await resp.json();
      }
    } catch (fileErr) {
      if (__DEV__) console.log('File constructor fallback failed', fileErr);
    }

    throw xhrError;
  }
}
