import React, { useEffect, useState } from 'react';
import { PagesComponents, RoutesRegexp } from './pages-config.gen';
import { RouterContext } from '@core/context/RouterContext';
import { matchRoute } from './utils/match-route';

interface AppWrapperProps {
  data: CommonPageProps;
}

export function AppWrapper(props: AppWrapperProps) {
  const { data } = props;
  const { route: initialRoute } = data;
  const [route, setRoute] = useState(initialRoute);
  const getPageData = () => {
    if (route !== initialRoute && typeof window !== undefined) {
      return {
        ...window.__ROUTES__.current,
        ssrData: window.__SSR_DATA__,
      };
    }
    return data;
  };
  const Page = PagesComponents[route as keyof typeof PagesComponents];

  useEffect(() => {
    window.addEventListener('popstate', () => {
      window.__ROUTES__.current = matchRoute(location.pathname, RoutesRegexp);
      window.__SSR_DATA__ = {};
      setRoute(window.__ROUTES__.current.route);
    });
  }, []);

  return (
    <RouterContext.Provider
      value={{
        route,
        setRoute,
      }}
    >
      <Page {...getPageData()} />
    </RouterContext.Provider>
  );
}
