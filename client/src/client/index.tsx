import React from 'react';
import { hydrate } from 'react-dom';
import { AppWrapper } from '../app-wrapper';
import { Workbox } from "workbox-window";
import { RouterWrapper } from 'src/@core/components/RouterWrapper';
import { checkIsMobile } from 'src/utils/common';

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/public/service-worker.js");
    wb.register();
  });
};
document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <RouterWrapper {...window.__ROUTES__.current}>
      <AppWrapper
        data={{
          userAgent: navigator.userAgent,
          isMobile: checkIsMobile(),
          ssrData: window.__SSR_DATA__,
        }}
      />
    </RouterWrapper>,
    document.getElementById('root'),
  );
});
