
import React from 'react';
import { hydrate } from 'react-dom';
import { AppWrapper } from '../app-wrapper';

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<AppWrapper route={window.__SSR_ROUTE__ || '/'}/>, document.getElementById('root'));
});