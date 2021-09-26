const path = require('path')
const webpack = require('webpack')
const webpackConfigClient = require('../webpack/webpack.client.config')
const webpackConfigServer = require('../webpack/webpack.server.config')
const spawn = require('cross-spawn')
require('dotenv').config();
webpack([
  {
    ...webpackConfigClient,
    mode: 'production',
    devtool: false,
    output: {
      ...webpackConfigClient.output,
      filename: '[name].js',
    },
  },
  {
    ...webpackConfigServer,
    mode: 'production',
    devtool: false,
  },
], (err, stats) => { // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    console.error(err)
    process.exit(1)
  }
  console.log('🎉 Webpack production build completed! ');
  /**
   * Compile pages for import ssr funcs in src/server/index.tsx
   */
  spawn.sync(
    'node',
    [path.join(__dirname, './compile-pages.js')],
    {
      stdio: 'inherit',
    }
  );
  console.log('😎 Build ready for start!');
});