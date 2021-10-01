import { createContext } from 'react';

export const RouterContext = createContext({
  route: '/',
  setRoute(route: string): void {
    throw new Error('setRoute not implemented' + route);
  },
});
