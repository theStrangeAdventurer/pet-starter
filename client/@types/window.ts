interface Window {
  __SSR_DATA__: { [param: string]: string };
  __ROUTES__: {
    current: {
      route: string;
      params: { [param: string]: string };
    };
    reqPath: string;
    pages: string[];
  };
}
