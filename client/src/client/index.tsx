
import React from 'react';
import { hydrate } from 'react-dom';
import { AppWrapper } from '../app-wrapper';

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<AppWrapper route={'/'}/>, document.getElementById('root'));
});