const unavailable = method => () => {
  throw new Error(`react-native-fs.${method} is not available on web.`);
};

const RNFS = {
  DocumentDirectoryPath: '',
  ExternalDirectoryPath: '',
  RNFSFileTypeRegular: 'regular',
  exists: async () => false,
  mkdir: async () => undefined,
  unlink: async () => undefined,
  moveFile: unavailable('moveFile'),
  downloadFile: () => ({
    promise: Promise.reject(
      new Error('react-native-fs.downloadFile is not available on web.'),
    ),
  }),
};

module.exports = RNFS;
module.exports.default = RNFS;
