module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@features': './src/features',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@styles': './src/styles',
          '@types': './src/types',
          '@store': './src/store',
        },
      },
    ],
  ],
};
