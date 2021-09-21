export function matchRoute(
  reqPath: string,
  pages: { [key: string]: RegExp }
): {
  route: string;
  params: { [key: string]: string };
} {
  const page = pages[reqPath];
  if (page) {
    return {
      route: reqPath,
      params: {},
    };
  }
  let match = null;
  for (const page in pages) {
    const re = pages[page];
    match = re.exec(reqPath);

    if (match?.groups) {
      match = {
        route: page,
        params: match.groups,
      };
      break;
    } else {
      match = null;
    }
  }
  if (!match) {
    match = {
      route: "/404",
      params: {},
    };
  }
  return match;
}
