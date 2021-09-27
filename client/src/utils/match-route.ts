import { RoutesRegexp } from "src/pages-config.gen";

export function matchRoute(
  reqPath: string,
  routesRegexp: typeof RoutesRegexp
): {
  route: string;
  params: { [key: string]: string };
} {
  const page = routesRegexp.find(([, route]) => route === reqPath);
  if (page) {
    return {
      route: reqPath,
      params: {},
    };
  }
  let result = null;

  for (const [re, route] of routesRegexp) {
    if (result) {
      continue;
    }
    const match = re.exec(reqPath);
    if (match?.groups) {
      result = {
        route,
        params: match.groups,
      };
    }
  }
  if (!result) {
    result = {
      route: "/404",
      params: {},
    };
  }
  return result;
}
