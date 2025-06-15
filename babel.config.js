module.exports = {
  presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@domain': './src/domain',
          '@data': './src/data',
          '@presentation': './src/presentation',
          '@components': './src/presentation/components',
          '@screens': './src/presentation/screens',
          '@utils': './src/presentation/utils',
        },
      },
    ],
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
