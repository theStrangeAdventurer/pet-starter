import React from 'react';
import {App} from './components/App';

interface AppWrapperProps {
  data: CommonPageProps;
}

export function AppWrapper(props: AppWrapperProps) {
  const { data } = props;
  return <>
    <App {...data} />
  </>
}