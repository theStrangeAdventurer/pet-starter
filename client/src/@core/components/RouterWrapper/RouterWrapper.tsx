import React, { useEffect, useReducer } from 'react';
import { RouterContext, routerContextInitialState, routerReducer } from '@core/context/RouterContext';
import { RoutesRegexp } from 'src/pages-config.gen';
import { matchRoute } from 'src/utils/match-route';

export const RouterWrapper: React.FC<Partial<{
     route: string;
     params: RouteParams;
 }>> = ({ children, route = routerContextInitialState.route, params = routerContextInitialState.params  }) => {
   const [state, dispatch] = useReducer(
     routerReducer,
     {
       route,
       params
     }
   );

   useEffect(() => {
     window.addEventListener('popstate', () => {
       window.__ROUTES__.current = matchRoute(location.pathname, RoutesRegexp);
       window.__SSR_DATA__ = {};
     });
   }, []);

   return (
     <RouterContext.Provider
       value={{
         state,
         dispatch
       }}
     >
       {children}
     </RouterContext.Provider>
   )
 }