const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

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
      'src': path.resolve(__dirname, '..', 'src')
    }
  }, 
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
};