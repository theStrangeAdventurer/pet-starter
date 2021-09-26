import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
import requireFromString from 'require-from-string';
const ejs = require("ejs").__express;

import { preparePages } from './utils/prepare-pages';
import { AppWrapper } from '../app-wrapper';
import { matchRoute } from './utils/match-route';
import { getRegexpFromPath } from './utils/get-regexp-from-path';

const app = express();
const jsFiles: string[] = [];
const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const pagesPath = path.resolve(__dirname, 'pages');
const pages = preparePages(pagesPath);
const chunks = Object.keys(parsedManifest).filter(f => f.indexOf('.map') === -1);

chunks.forEach(filename => {
  jsFiles.push('/public/' + parsedManifest[filename])
});

const scripts = jsFiles.map((script) => `<script class="react-script" defer="defer" src="${script}"></script>`).join('\n');

;(async function main() {
  const pagesWithRegexps: { [page: string]: { regexp: RegExp, getSSRProps?: GetSSRProps } } = {};
  for (const page of pages) {
    const isIndex = page === '/';
    const fileStr = fs.readFileSync(`${__dirname}/pages${isIndex ? '/index' : page}.js`).toString();
    const { getSSRProps } : { getSSRProps: GetSSRProps } = requireFromString(fileStr);
    pagesWithRegexps[page] = { regexp: getRegexpFromPath(page), getSSRProps };
  }

  app.use('/public', express.static(assetsFolder));
  app.set('view engine', 'ejs');
  app.engine('ejs', ejs);
  app.set('views', path.join(__dirname, 'views'));
  app.get("*", async (req, res) => {
    const currentRoute = matchRoute(req.path, pagesWithRegexps);
    const getSSRProps = pagesWithRegexps[currentRoute.route]?.getSSRProps;
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
        pages,
    });
    res.status(status).render('client', {
      ssrData: JSON.stringify(ssrData || {}),
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
})();