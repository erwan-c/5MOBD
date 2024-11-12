module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|expo-font|expo-image-picker|@expo|@firebase)/)',
    ],
    setupFilesAfterEnv: ['./jest/setup.js'], 
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  