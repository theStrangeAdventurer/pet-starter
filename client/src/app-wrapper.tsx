import React from 'react';
import { PageComponents } from './pages-config.gen';
interface AppWrapperProps {
  data: CommonPageProps;
}

export function AppWrapper(props: AppWrapperProps) {
  const { data } = props;
  const { route } = data;
  const Page = PageComponents[route as keyof typeof PageComponents];
  return <>
    <Page {...data} />
  </>
}