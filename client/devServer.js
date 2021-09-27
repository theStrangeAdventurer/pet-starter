const spawn = require('cross-spawn')
const path = require('path')
const webpack = require('webpack')
const webpackConfigClient = require('./webpack/webpack.client.config')
const webpackConfigServer = require('./webpack/webpack.server.config')
const http = require('http');
require('dotenv').config();

let messageId = 0
let client = null;
const liveReloadServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.write(`data: ${JSON.stringify({ connected: true })}\n`);
  res.write(`id: ${++messageId}\n`);
  res.write(`\n`);
  client = res;
});

liveReloadServer.listen(process.env.LIVE_RELOAD_PORT, () => {
  console.log(`Live reload server up and running on port ${process.env.LIVE_RELOAD_PORT} ✨`);
});

const compiler = webpack([
  {
    ...webpackConfigClient,
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...webpackConfigClient.output,
      filename: '[name].js',
    },
  },
  {
    ...webpackConfigServer,
    mode: 'development',
    devtool: 'source-map',
  },
])

let node
/**
 * Generate pages-config first time before webpack will build
 */
spawn.sync(
  'node',
  [path.join(__dirname, './scripts/generate-pages-config.js')],
  {
    stdio: 'inherit',
  }
);

compiler.hooks.watchRun.tap('Dev', (compiler) => {
  console.log(`Compiling ${compiler.name} ...`)
  if (compiler.name === 'server' && node) {
    node.kill()
    node = undefined
  }
})

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const compiledSuccessfully = !stats?.hasErrors()
  if (compiledSuccessfully && !node) {
    /**
     * Compile pages for import ssr funcs in src/server/index.tsx
     */
    spawn.sync(
      'node',
      [path.join(__dirname, './scripts/compile-pages.js')],
      {
        stdio: 'inherit',
      }
    );

    if (client) {
      setTimeout(() => {
        console.log('🔄 Reloading your browser');
        client.write(`data: ${JSON.stringify({ reload: true })}\n`);
        client.write(`id: ${++messageId}\n`);
        client.write(`\n`); 
      }, 300); // Timeout for start node server
    }

    /**
     * spawn new node process with updated scripts
     */
    console.log('🦸 Spawn new NodeJS ssr instance ...');
    node = spawn(
      'node',
      ['--inspect', path.join(__dirname, '../dist/ssr.js')],
      {
        stdio: 'inherit',
      }
    );
  }
})