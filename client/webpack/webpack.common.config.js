const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'components': path.resolve(__dirname, '..', 'src', 'components'),
      'src': path.resolve(__dirname, '..', 'src'),
      '@core': path.resolve(__dirname, '..', 'src', '@core')
    }
  }, 
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': process.env.PORT,
      'process.env.LIVE_RELOAD_PORT': process.env.LIVE_RELOAD_PORT
    })
  ],
};