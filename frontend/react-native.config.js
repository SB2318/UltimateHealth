module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable iOS linking if not needed
      },
    },
   
  },
  assets: ['./src/assets/fonts'], // Link custom fonts
};
