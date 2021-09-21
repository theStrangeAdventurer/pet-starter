import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
import { preparePages } from './utils/prepare-pages';
import { AppWrapper } from '../app-wrapper';
import { matchRoute } from './utils/match-route';
import { getRegexpFromPath } from './utils/get-regexp-from-path';

const ejs = require("ejs").__express;

const app = express();
const jsFiles: string[] = [];

const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const pages = preparePages(path.resolve(__dirname, 'pages'));
const pagesWithRegexps = pages.reduce((acc, page) => {
  acc[page] = getRegexpFromPath(page);
  return acc;
}, {} as { [key: string]: RegExp })
const chunks = Object.keys(parsedManifest).filter(f => f.indexOf('.map') === -1);
console.log('pagesWithRegexps', pagesWithRegexps);

chunks.forEach(filename => {
  jsFiles.push('/public/' + parsedManifest[filename])
});

const scripts = jsFiles.map((script) => `<script class="react-script" defer="defer" src="${script}"></script>`).join('\n');


app.use('/public', express.static(assetsFolder));

app.set('view engine', 'ejs');
app.engine('ejs', ejs);

app.set('views', path.join(__dirname, 'views'));

app.get("*", (req, res) => {
  const jsx = renderToString(<AppWrapper route={req.path} />);
  const currentRoute = matchRoute(req.path, pagesWithRegexps);
  const routes = JSON.stringify({
      current: currentRoute,
      reqPath: req.path,
      pages,
  });
  console.log('routes', routes);
  res.render('client', {
    routes,
    jsx, 
    scripts,
    liveReloadPort: process.env.LIVE_RELOAD_PORT,
    liveReloadScript: process.env.NODE_ENV === 'development'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`SSR server started on port ${process.env.PORT} 🚀`);
});
