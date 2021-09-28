import { Link } from '../@core/components/Link/Link';
import React from 'react';
import { App } from 'src/components/App';

export default () => {
  return <div>
    <App />
    <Link to="/details/someDetailId">Go to Details</Link>
  </div>
}