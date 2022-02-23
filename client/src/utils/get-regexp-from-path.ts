export function getRegexpFromPath(path: string) {
  const reStr = path.replace(/\:(\w+)/g, function () {
    // eslint-disable-next-line prefer-rest-params
    return `(?<${arguments[1]}>[\\w-]+)`;
  });
  return new RegExp(`^${reStr}(\\?[\\w\\d\\-=]+)?$`);
}
