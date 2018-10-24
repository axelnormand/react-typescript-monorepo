const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { getHappyPackPlugin } = require('./config');

/**
 * add typescript to storybook webpack
 *
 * Similar config to the main webpack one
 */
const getStorybookWebpackConfig = storybookDir => baseConfig => {
  const tsConfigFile = path.join(storybookDir, '../tsconfig.json');

  baseConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    loader: 'happypack/loader?id=ts',
  });

  baseConfig.resolve = {
    extensions: ['.tsx', '.ts', '.js'],
    // ts config paths plugin enables following those lerna import links
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfigFile })],
  };

  baseConfig.plugins.push(getHappyPackPlugin(tsConfigFile));

  return baseConfig;
};

module.exports = {
  getStorybookWebpackConfig,
};
