import React from "react";

export type GlobalContextState = {
  isMobile: boolean;
  userAgent: string | null;
};

// TODO: In the future, it will be possible to add the necessary actions here
export const globalReducer = (
  state: GlobalContextState,
): GlobalContextState => state;

export const globalContextInitialState: GlobalContextState = {
  isMobile: true,
  userAgent: null,
};

export const GlobalContext = React.createContext({
  state: globalContextInitialState,
});
