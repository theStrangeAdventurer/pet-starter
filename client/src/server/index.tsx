import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
const ejs = require("ejs").__express;

import { AppWrapper } from '../app-wrapper';
import { matchRoute } from '../utils/match-route';
import { PagesGetSSRPropsHandlers, RoutesRegexp } from 'src/pages-config.gen';

const app = express();
const jsFiles: string[] = [];
const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const chunks = Object.keys(parsedManifest).filter(f => !/(\.map|\.css)/g.test(f));
const cssFiles = Object.keys(parsedManifest).filter(f => !/(\.map|\.js)/g.test(f));

chunks.forEach(filename => {
  jsFiles.push('/public/' + parsedManifest[filename])
});

const scripts = jsFiles.map((script) => `<script class="react-script" defer="defer" src="${script}"></script>`).join('\n');
const cssLinks = cssFiles.map((link) => `<link rel="stylesheet" href="/public/${link}">`).join('\n');

app.use('/public', express.static(assetsFolder));
app.set('view engine', 'ejs');
app.engine('ejs', ejs);
app.set('views', path.join(__dirname, 'views'));
app.get("*", async (req, res) => {
  const currentRoute = matchRoute(req.path, RoutesRegexp);
  const getSSRProps = PagesGetSSRPropsHandlers[currentRoute.route as keyof typeof PagesGetSSRPropsHandlers];
  let ssrData: unknown;
  if (getSSRProps) {
    ssrData = await getSSRProps(currentRoute.params);
  }
  
  const jsx = renderToString(<AppWrapper data={{
    ...currentRoute, 
    ssrData
  }} />);
  const status = currentRoute.route !== '/404' ? 200 : 404;
  const routes = JSON.stringify({
      current: currentRoute,
      reqPath: req.path,
      pages: RoutesRegexp.map(([, route]) => route),
  });
  res.status(status).render('client', {
    ssrData: JSON.stringify(ssrData || {}),
    routes,
    jsx, 
    scripts,
    cssLinks,
    liveReloadPort: process.env.LIVE_RELOAD_PORT,
    liveReloadScript: process.env.NODE_ENV === 'development'
  });
});
app.listen(process.env.PORT, () => {
  console.log(`SSR server started on port ${process.env.PORT} 🚀`);
});