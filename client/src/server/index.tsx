import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
const ejs = require("ejs").__express;

import { AppWrapper } from '../app-wrapper';
import { matchRoute } from '../utils/match-route';
import { PagesGetSSRPropsHandlers, RoutesRegexp } from 'src/pages-config.gen';
import { prepareAssetsHtml } from './utils/prepare-assets-html';
import { Helmet } from 'react-helmet';

const app = express();
const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const { jsScriptsHtml, cssLinkshtml } = prepareAssetsHtml(parsedManifest);

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
  const helmet = Helmet.renderStatic();
  const helmetHead = `
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  `;
  const status = currentRoute.route !== '/404' ? 200 : 404;
  const routes = JSON.stringify({
      current: currentRoute,
      reqPath: req.path,
      pages: RoutesRegexp.map(([, route]) => route),
  });
  res.status(status).render('client', {
    helmetHead,
    ssrData: JSON.stringify(ssrData || {}),
    routes,
    jsx, 
    scripts: jsScriptsHtml,
    cssLinks: cssLinkshtml,
    liveReloadPort: process.env.LIVE_RELOAD_PORT,
    liveReloadScript: process.env.NODE_ENV === 'development'
  });
});
app.listen(process.env.PORT, () => {
  console.log(`SSR server started on port ${process.env.PORT} 🚀`);
});