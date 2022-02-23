import React, { useContext, useReducer, } from 'react';
import { PagesComponents } from './pages-config.gen';
import { RouterContext } from '@core/context/RouterContext';
import { GlobalContext, globalContextInitialState, globalReducer } from './@core/context/GlobalContext';

interface AppWrapperProps {
  data: CommonPageProps;
}

export function AppWrapper(props: AppWrapperProps) {
  const { data } = props;
  const { state: { route } } = useContext(RouterContext);
  const Page = PagesComponents[route as keyof typeof PagesComponents];

  const [globalState] = useReducer(
    globalReducer,
    globalContextInitialState
  );
  
  return (
    <GlobalContext.Provider value={{ state: globalState }}>
      <Page {...data} />
    </GlobalContext.Provider>
  );
}
