export function getRegexpFromPath(path: string) {
  const reStr = path.replace(/\:(\w+)/g, function () {
    return `(?<${arguments[1]}>\\w+)`;
  });
  return new RegExp(reStr, "g");
}
