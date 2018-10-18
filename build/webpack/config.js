const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HappyPack = require('happypack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const getHappyPackPlugin = (tsConfigFile) => new HappyPack({
  id: 'ts',
  threads: 2,
  loaders: [
    {
      path: 'ts-loader',
      query: {
        happyPackMode: true,
        transpileOnly: true,
        configFile: tsConfigFile,
        experimentalFileCaching: true,
        getCustomTransformers: path.join(
          __dirname,
          './styledComponentsTransformer.js',
        ),
      },
    },
  ],
});

const getWebpackConfig = projectDir => {
  const dev = process.env.NODE_ENV !== 'production';
  const tsConfigFile = path.join(projectDir, 'tsconfig.json');

  const htmlPlugin = new HTMLWebpackPlugin({
    template: path.join(projectDir, 'src/index.html'),
    filename: 'index.html',
    inject: true,
  });
 
  // common config
  let config = {
    context: projectDir, // to find tsconfig.json
    mode: dev ? 'development' : 'production',
    output: {
      path: path.join(projectDir, 'dist/webpack'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      hot: true,
      overlay: true,
    },
    devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // ts config paths plugin enables following those lerna import links
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfigFile })],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'happypack/loader?id=ts',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    //common plugins
    plugins: [getHappyPackPlugin(tsConfigFile), htmlPlugin],
  };

  if (dev) {
    config = setDevConfig(config, projectDir);
  } else {
    config = setProdConfig(config, projectDir);
  }

  return config;
};

const setProdConfig = (config, projectDir) => {
  console.log("Using production webpack config");
  const prodDefinePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });

  config.entry = path.join(projectDir, 'src/index.tsx'),

  config.plugins = config.plugins.concat([prodDefinePlugin]);

  config.output.filename = '[name].[chunkhash].bundle.js';

  config.optimization = {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  };
  return config;
};

const setDevConfig = (config, projectDir) => {
  config.entry = ['react-hot-loader/patch', path.join(projectDir, 'src/index.tsx')],
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]);

  return config;
};

module.exports = {
  getHappyPackPlugin,
  getWebpackConfig,
};
