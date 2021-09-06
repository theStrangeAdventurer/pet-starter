const path = require('path');
const commonConfig = require('./webpack.common.config');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  entry: [
    './src/client/index.tsx'
  ],
  target: 'web',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'public'),
    libraryTarget: 'umd',
  },
}) ;