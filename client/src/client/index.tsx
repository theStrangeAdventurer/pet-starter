
import React from 'react';
import { hydrate } from 'react-dom';
import { App } from 'src/components/App';

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<App />, document.getElementById('root'));
})