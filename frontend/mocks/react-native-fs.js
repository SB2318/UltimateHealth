// Web mock for react-native-fs
// On web, RNFSFileTypeRegular and other native constants crash at import time.

const RNFS = {
  // Constants
  RNFilesystemType: 'web',
  MainBundlePath: '',
  CachesDirectoryPath: '',
  DocumentDirectoryPath: '',
  ExternalDirectoryPath: '',
  ExternalStorageDirectoryPath: '',
  TemporaryDirectoryPath: '',
  LibraryDirectoryPath: '',
  PicturesDirectoryPath: '',

  // File read/write
  readDir: async () => [],
  readdir: async () => [],
  stat: async () => ({ name: '', path: '', size: 0, mode: 0 }),
  readFile: async () => '',
  read: async () => '',
  readFileAssets: async () => '',
  exists: async () => false,
  isResumable: async () => false,

  // File write
  writeFile: async () => {},
  appendFile: async () => {},
  write: async () => {},
  unlink: async () => {},
  unlinkIfExists: async () => {},
  moveFile: async () => {},
  copyFile: async () => {},
  copyFileAssets: async () => {},
  existsAssets: async () => false,
  mkdir: async () => {},
  touch: async () => {},

  // Download
  downloadFile: () => ({
    jobId: 0,
    promise: Promise.resolve({ statusCode: 200, jobId: 0 }),
  }),
  stopDownload: () => {},

  // Upload
  uploadFiles: () => ({
    jobId: 0,
    promise: Promise.resolve({ statusCode: 200, jobId: 0, body: '' }),
  }),
  stopUpload: () => {},

  // Other
  getFSInfo: async () => ({ totalSpace: 0, freeSpace: 0 }),
  hash: async () => '',
  getAllExternalFilesDirs: async () => [],
  scanFile: async () => {},
};

module.exports = RNFS;
