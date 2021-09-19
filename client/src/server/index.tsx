import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
import { preparePages } from './utils/prepare-pages';
import { AppWrapper } from '../app-wrapper';

const ejs = require("ejs").__express;

const app = express();
const jsFiles: string[] = [];

const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const pages = preparePages(path.resolve(__dirname, 'pages'));

console.log('PAGES', pages);

const chunks = Object.keys(parsedManifest).filter(f => f.indexOf('.map') === -1);

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
  res.render('client', {
    ssrRoute: req.path, 
    jsx, 
    scripts,
    liveReloadPort: process.env.LIVE_RELOAD_PORT,
    liveReloadScript: process.env.NODE_ENV === 'development'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`SSR server started on port ${process.env.PORT} 🚀`);
});
