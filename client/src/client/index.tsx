import React from 'react';
import { hydrate } from 'react-dom';
import { AppWrapper } from '../app-wrapper';
import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/public/service-worker.js");
    wb.register();
  });
};
document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <AppWrapper
      data={{
        ...window.__ROUTES__.current,
        ssrData: window.__SSR_DATA__,
      }}
    />,
    document.getElementById('root'),
  );
});
