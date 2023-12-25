/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", 
      require.resolve("expo-router/babel"),
      [
        'module-resolver',
        {
          alias: {
            'app': './app',
            'src': './src',
            'api': './src/api',
            'assets': './src/assets',
            'components': './src/components',
            'constants': './src/constants',
            'screens': './src/screens',
          },
        },
      ],
    ],
  };
};
