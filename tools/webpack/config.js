const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HappyPack = require('happypack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const getHappyPackPlugin = tsConfigFile =>
  new HappyPack({
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

/** generate common config then merge with webpack-merge */
const getCommonConfig = projectDir => {
  const tsConfigFile = path.join(projectDir, 'tsconfig.json');

  const htmlPlugin = new HTMLWebpackPlugin({
    template: path.join(projectDir, 'src/index.html'),
    filename: 'index.html',
    inject: true,
  });

  const config = {
    context: projectDir, // to find tsconfig.json
    output: {
      path: path.join(projectDir, 'dist'),
      publicPath: '/',
    },
    devServer: {
      hot: true,
      overlay: true,
      historyApiFallback: true, // for history html5 api
      quiet: true, //for friendly errors to work
    },
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
            name: '[name].[hash:4].[ext]',
          },
        },
      ],
    },
    //common plugins
    plugins: [
      getHappyPackPlugin(tsConfigFile),
      htmlPlugin,
      new FriendlyErrorsWebpackPlugin(),
    ],
  };

  return config;
};

const getProdConfig = projectDir => {
  const commonConfig = getCommonConfig(projectDir);

  const prodDefinePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });
  
  const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
    reportFilename: path.join(projectDir, 'build/bundleAnalyzer.html'),
    analyzerMode: 'static',
    openAnalyzer: false,
  });


  const prodConfig = {
    mode: 'production',
    entry: path.join(projectDir, 'src/index.tsx'),
    plugins: [prodDefinePlugin, bundleAnalyzerPlugin],
    output: {
      filename: '[name].[chunkhash:4].js',
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1,
          },
        },
      },
    },
  };

  const config = merge(commonConfig, prodConfig);
  return config;
};

const getDevConfig = projectDir => {
  const commonConfig = getCommonConfig(projectDir);

  const devConfig = {
    mode: 'development',
    entry: ['react-hot-loader/patch', path.join(projectDir, 'src/index.tsx')],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
      filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
  };

  const config = merge(commonConfig, devConfig);
  return config;
};

/** 
 * pass in --env in package.json:  
 * `webpack --env production`
 * or
 * `webpack-dev-server --env development --open --port 3001`
 */
const getWebpackConfig = projectDir => env => {
  if (env === 'production') {
    return getProdConfig(projectDir);
  }
  return getDevConfig(projectDir);
};

module.exports = {
  getHappyPackPlugin,
  getWebpackConfig,
};
