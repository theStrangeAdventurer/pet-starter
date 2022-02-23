import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import ejsModule from 'ejs';
// @ts-ignore
const ejs = ejsModule.__express;

import { AppWrapper } from '../app-wrapper';
import { matchRoute } from 'src/utils/match-route';
import { checkIsMobile } from 'src/utils/common';
import { prepareAssetsHtml, prepareSsrData } from './utils';
import { PagesGetSSRPropsHandlers, RoutesRegexp } from 'src/pages-config.gen';
import { Helmet } from 'react-helmet';
import { RouterWrapper } from 'src/@core/components/RouterWrapper';

const app = express();
const assetsManifest = path.resolve(__dirname, 'public', 'manifest.json');
const manifest: Buffer = fs.readFileSync(assetsManifest);
const parsedManifest = JSON.parse(manifest.toString());
const { jsScriptsHtml, cssLinkshtml } = prepareAssetsHtml(parsedManifest);

app.set('view engine', 'ejs');
app.engine('ejs', ejs);
app.set('views', path.join(__dirname, 'views'));
app.get('*', async (req, res) => {
  const currentRoute = matchRoute(req.path, RoutesRegexp);
  const getSSRProps = PagesGetSSRPropsHandlers[currentRoute.route as keyof typeof PagesGetSSRPropsHandlers];
  let ssrData = {} as Record<string, unknown>;
  if (getSSRProps) {
    ssrData = await getSSRProps(currentRoute.params);
  }
  const userAgent = req.headers['user-agent'];
  const isMobile = checkIsMobile(userAgent);

  const jsx = renderToString(
    <RouterWrapper {...currentRoute}>
      <AppWrapper
        data={{
          userAgent,
          isMobile,
          ssrData,
        }}
      />
    </RouterWrapper>,
  );
  const helmet = Helmet.renderStatic();
  const helmetHead = `
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  `;
  const status = currentRoute.route !== '/404' ? 200 : 404;
  const routes = prepareSsrData({
    current: currentRoute,
    reqPath: req.path,
    pages: RoutesRegexp.map(([, route]) => route),
  });
  res.status(status).render('client', {
    helmetHead,
    ssrData: prepareSsrData(ssrData),
    routes,
    jsx,
    scripts: jsScriptsHtml,
    cssLinks: cssLinkshtml,
    liveReloadPort: process.env.LIVE_RELOAD_PORT,
    liveReloadScript: process.env.NODE_ENV === 'development',
  });
});
app.listen(process.env.PORT, () => {
  console.log(`SSR server started on port ${process.env.PORT} 🚀`);
});
