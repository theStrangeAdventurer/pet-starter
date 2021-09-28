import { useContext } from "react";
import { RoutesRegexp } from "src/pages-config.gen";
import { matchRoute } from "src/utils/match-route";
import { RouterContext } from "../context/RouterContext";

export function useNavigate() {
  const { setRoute } = useContext(RouterContext);

  return (to: string) => {
    window.__ROUTES__.current = matchRoute(to, RoutesRegexp);
    window.__SSR_DATA__ = {};
    history.pushState({ route: window.__ROUTES__.current.route }, "", to);
    setRoute(window.__ROUTES__.current.route);
  };
}
