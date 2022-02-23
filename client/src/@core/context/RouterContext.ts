import { createContext } from 'react';

const ROUTER_ACTION_TYPES = {
  SET_ROUTE: "SET_ROUTE",
  SET_PARAMS: "SET_PARAMS",
} as const;

const setRoute = (payload: string) => {
  return {
    type: ROUTER_ACTION_TYPES.SET_ROUTE,
    payload,
  };
};

const setParams = (payload: Record<string, any>) => {
  return {
    type: ROUTER_ACTION_TYPES.SET_PARAMS,
    payload,
  };
};

type RouterContextState = {
  route: string;
  params: RouteParams;
}

export const ROUTER_ACTIONS = {
  setRoute,
  setParams,
};

type RouterAction =
  | ReturnType<typeof setRoute>
  | ReturnType<typeof setParams>;

export const routerReducer = (
  state: RouterContextState,
  action: RouterAction
): RouterContextState => {
  switch (action.type) {
    case ROUTER_ACTION_TYPES.SET_ROUTE:
      return {
        ...state,
        route: action.payload,
      };
    case ROUTER_ACTION_TYPES.SET_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
  }
};

export const routerContextInitialState: RouterContextState = {
  route: '/',
  params: {},
};

export const RouterContext = createContext({
  state: routerContextInitialState,
  dispatch: (action: RouterAction) => {},
});