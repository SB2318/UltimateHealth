// Web mock for react-native-share
// On web, NativeModules.RNShare is undefined, which crashes at import time.

const Share = {
  open: async () => ({ success: true, message: 'Shared (mock)' }),
  canShare: async () => true,
  shareSingle: async () => ({ success: true }),
  Social: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    WHATSAPP: 'whatsapp',
    INSTAGRAM: 'instagram',
    TELEGRAM: 'telegram',
    EMAIL: 'email',
  },
};

export default Share;
