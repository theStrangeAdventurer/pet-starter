export function matchRoute(
  reqPath: string,
  pages: { [key: string]: { regexp: RegExp } }
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
  let result = null;
  for (const page in pages) {
    if (result) {
      continue;
    }
    const re = pages[page].regexp;
    const match = re.exec(reqPath);

    if (match?.groups) {
      result = {
        route: page,
        params: match.groups,
      };
      break;
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
