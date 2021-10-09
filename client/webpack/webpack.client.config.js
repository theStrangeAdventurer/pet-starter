const path = require('path');
const commonConfig = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

const MAX_CHUNK_SIZE = 100_000;
const MIN_CHUNK_SIZE = 30_000;

module.exports = merge(commonConfig, {
  name: 'client',
  entry: [
    './src/client/index.tsx'
  ],
  target: 'web',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: MIN_CHUNK_SIZE,
      maxSize: MAX_CHUNK_SIZE,
      name: (module, chunks, cacheGroupKey) => {
        const moduleFileName = module
          .identifier()
          .split('/')
          .reduceRight((item) => item);
        return `${cacheGroupKey}~${moduleFileName}`;
      }
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'public'),
    libraryTarget: 'umd',
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new WorkboxPlugin.InjectManifest({
      swSrc: 'src/client/service-worker.js',
      swDest: "service-worker.js",
    }),
  ]
}) ;