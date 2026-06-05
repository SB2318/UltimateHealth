module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*)(react-native|@react-native|expo|react-navigation|@react-navigation|@unimodules|unimodules|sentry-expo|native-base|react-native-svg|@gorhom/bottom-sheet|tamagui|@tamagui|expo-router|react-native-reanimated|immer|@reduxjs))'
  ],
};
