const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            }
          },
          'postcss-loader'
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        exclude: /\.module\.css$/
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      'src': path.resolve(__dirname, '..', 'src'),
      '@core': path.resolve(__dirname, '..', 'src/@core'),
      '@utils': path.resolve(__dirname, '..', 'src/utils'),
      '@components': path.resolve(__dirname, '..', 'src/components'),
    }
  }, 
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': process.env.PORT,
      'process.env.LIVE_RELOAD_PORT': process.env.LIVE_RELOAD_PORT
    }),
    new MiniCssExtractPlugin(),
  ],
};