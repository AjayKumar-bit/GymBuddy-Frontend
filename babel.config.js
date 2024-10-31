module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@constants': './src/constants',
          '@services': './src/services',
          '@theme': './src/theme',
        },
      },
    ],
  ],
}
