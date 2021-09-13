import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';
const ejs = require("ejs").__express;
const isDev = process.env.NODE_ENV === 'development';

import { App } from 'src/components/App';

const app = express();
const jsFiles: string[] = [];

const assetsFolder = path.resolve(__dirname, 'public');
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const chunks = Object.keys(parsedManifest).filter(f => f.indexOf('.map') === -1);

chunks.forEach(filename => {
  jsFiles.push('/public/' + parsedManifest[filename])
});

const scripts = jsFiles.map((script) => `<script defer="defer" src="${script}"></script>`).join('\n');
const jsx = renderToString(<App />);
if (isDev) {
  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());
}
app.use('/public', express.static(assetsFolder));
app.set('view engine', 'ejs');
app.engine('ejs', ejs);
app.set('views', path.join(__dirname, 'views'))
app.get("/", (req, res) => {
  res.render('client', {
    jsx, 
    scripts
  });
});

app.listen(8080, () => {
  console.log("App started on port 8080");
});
