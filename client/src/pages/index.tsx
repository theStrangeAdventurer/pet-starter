import React from 'react';
import { App } from 'src/components/App';
import { Helmet } from 'react-helmet';

export default () => {
  return (
    <>
      <Helmet>
        <title>Pet Starter SEO title</title>
        <meta name="description" content="Pet Starter SEO descroption" />
      </Helmet>
      <App />
    </>
  )
}