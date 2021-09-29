const webpack = require('webpack')
const webpackConfigClient = require('../webpack/webpack.client.config')
const webpackConfigServer = require('../webpack/webpack.server.config')
require('dotenv').config();

console.log('🏎️ Start webpack build...');
const start = +new Date();
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
  const finish = +new Date();
  console.log(stats?.toString('minimal'));
  console.log(`🎉 Webpack production build completed! [${((finish - start) / 1000)} seconds]`);
});