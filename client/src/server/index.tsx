import express from "express";
import React from 'react';
import { renderToString } from "react-dom/server";
import fs from 'fs';
import path from 'path';

import { App } from 'src/components/App';

const app = express();
const jsFiles: string[] = [];

const assetsFolder = path.resolve(__dirname, 'public');

fs.readdirSync(assetsFolder).forEach(file => {
    if (file.split('.').pop() === 'js') jsFiles.push('/public/' + file)
});

app.use('/public', express.static(assetsFolder));

app.get("/", (req, res) => {
  const jsx = renderToString(<App />);
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React ssr</title>
</head>
<body>
  <div id="root">${jsx}<div>
  ${jsFiles.map((script) => `<script defer src="${script}"></script>`).join('\n\t')}
</body>
</html>  
`);
});

app.listen(8080, () => {
  console.log("App started on port 8080");
});
