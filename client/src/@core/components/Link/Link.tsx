import React, { useContext } from 'react';
import { RouterContext } from 'src/@core/context/RouterContext';
import { RoutesRegexp } from 'src/pages-config.gen';
import { matchRoute } from 'src/utils/match-route';

interface LinkProps {
  to: string;
  children: React.ReactChild;
  className?: string;
}

export const Link = (props: LinkProps) => {
  const { setRoute } = useContext(RouterContext);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (props.to.includes('http')) {
      window.open(props.to);
      return;
    }
    window.__ROUTES__.current = matchRoute(props.to, RoutesRegexp);
    window.__SSR_DATA__ = {};
    history.pushState({ route: window.__ROUTES__.current.route }, '', props.to);
    setRoute(window.__ROUTES__.current.route);
  }
  return <a className={props.className} href={props.to} onClick={handleClick}>{props.children}</a>
};