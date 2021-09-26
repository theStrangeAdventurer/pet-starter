
import React from 'react';
import { hydrate } from 'react-dom';
import { AppWrapper } from '../app-wrapper';

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<AppWrapper data={{
    ...window.__ROUTES__.current, 
    ssrData: window.__SSR_DATA__
  }}/>, document.getElementById('root'));
});