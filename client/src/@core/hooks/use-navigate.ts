import { useContext } from 'react';
import { RoutesRegexp } from 'src/pages-config.gen';
import { matchRoute } from 'src/utils/match-route';
import { RouterContext, ROUTER_ACTIONS } from '../context/RouterContext';

export function useNavigate() {
  const { dispatch } = useContext(RouterContext);
  
  return (to: string) => {
    window.__ROUTES__.current = matchRoute(to, RoutesRegexp);
    window.__SSR_DATA__ = {};
    history.pushState({ route: window.__ROUTES__.current.route }, '', to);
    dispatch(ROUTER_ACTIONS.setRoute(window.__ROUTES__.current.route));
    // @ts-ignore
    dispatch(ROUTER_ACTIONS.setParams(search ? Object.fromEntries(new URLSearchParams(search)) : {}));
  };
}