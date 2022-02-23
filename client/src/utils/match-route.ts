import { RoutesRegexp } from '../pages-config.gen';

export function matchRoute(
  reqPath: string,
  routesRegexp: typeof RoutesRegexp,
): {
  route: string;
  params: { [key: string]: string };
} {
  let result = null;
  const [, search = ''] = reqPath.split('?');
  const searchParams = Object.fromEntries((new URLSearchParams(search) as unknown) as Iterable<readonly any[]>);  

  for (const [re, route] of routesRegexp) {
    if (result) {
      continue;
    }
    const match = re.exec(reqPath);
    
    if (match === null) {
      continue;
    }
    
    let params = {
      ...searchParams,
    };
    if (match.groups) {
      params = {
        ...params,
        ...match.groups
      }
    }

    result = {
      route,
      params,
    };
  }
  if (!result) {
    result = {
      route: '/404',
      params: {},
    };
  }
  return result;
}
