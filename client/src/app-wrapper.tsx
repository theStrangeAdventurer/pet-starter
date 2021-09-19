import React from 'react';
import {App} from './components/App';

interface AppWrapperProps {
  route: string;
}

export function AppWrapper(props: AppWrapperProps) {
  // const { route } = props;
  return <>
    <h1>AppWrapper</h1>
    <App />
  </>
}