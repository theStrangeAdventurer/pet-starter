const path = require('path');
const commonConfig = require('./webpack.common.config');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');

module.exports = merge.merge(commonConfig, {
  entry: [
    './src/server/index.tsx'
  ],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'ssr.js',
    path: path.resolve(__dirname, '..', '..', 'dist'),
    libraryTarget: 'commonjs2',
  },
});