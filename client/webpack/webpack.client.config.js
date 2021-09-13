const path = require('path');
const commonConfig = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = merge(commonConfig, {
  name: 'client',
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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'public'),
    libraryTarget: 'umd',
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
  ]
}) ;