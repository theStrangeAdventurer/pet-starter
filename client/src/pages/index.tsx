import { Link } from '../@core/components/Link/Link';
import React from 'react';

export default (props: CommonPageProps) => {
  return <div>
    <h1>Main page</h1>
    <Link to="/details/someDetailId">Go to Details</Link>
  </div>
}