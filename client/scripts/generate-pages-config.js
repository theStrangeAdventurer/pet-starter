const fs = require("fs");
const path = require('path');
const { preparePages } = require('./utils/prepare-pages');

const pages = preparePages(path.resolve(__dirname, '../src/pages'));

const pagesWithGetSSRProps = {};

for (const page of pages) {
  const fileStr = fs.readFileSync(page).toString();
  if (fileStr.includes('export const getSSRProps'))
    pagesWithGetSSRProps[page] = true;
}

let configFileStr = `
/* Do not change this file, it is generated automatically */
import { getRegexpFromPath } from './utils/get-regexp-from-path';

`;

const specialPagesAliases = {
  '404.tsx': 'NotFoundPage',
  'index.tsx': 'MainPage',
};

const getPageRouteByPath = (path) => {
  if (path.includes('index.tsx')) {
    return '/';
  }
  const [, pageFileName] = path.split('pages/');
  return `/${pageFileName.replace('.tsx', '')}`;
}

const getPageComponentName = (filename) => {
  const isSpecialPageName = Boolean(specialPagesAliases[filename]);
  if (isSpecialPageName) {
    return specialPagesAliases[filename];
  }
  const CamelCaseName = filename.replace(/(^\w|\/:?(\w))/g, (...match) => {
      console.log();
      return match[1].toUpperCase();
  });

  return CamelCaseName.replace(/(\/|:|\.tsx)/g, '') + 'Page';
}

const pagesImportsData = pages.map((page) => {
  const [, pageFileName] = page.split('pages/');
  const hasGetSSRProps = pagesWithGetSSRProps[page];
  return [
    getPageComponentName(pageFileName), // import name for pages-config.gen.ts
    "./pages/" + pageFileName.replace('.tsx', ''), // import path for pages-config.gen.ts
    getPageRouteByPath(page), // export route key for PageComponent in pages-config.gen.ts
    hasGetSSRProps
  ];
});

configFileStr += pagesImportsData.reduce((acc, current) => {
  const [ComponentName, importPath, , hasGetSSRProps] = current;
  return acc + `import ${ComponentName}${
    hasGetSSRProps ? `, { getSSRProps as ${ComponentName}GetSSRProps }` : ''
  } from "${importPath}";\n`
}, '');

configFileStr += '\n\nexport const PagesGetSSRPropsHandlers = {\n';
configFileStr += pagesImportsData.reduce((acc, current) => {
  const [ComponentName, , route, hasGetSSRProps] = current;
  if (!hasGetSSRProps) {
    return acc;
  }
  return acc + `\t"${route}": ${ComponentName}GetSSRProps,\n`
}, '');
configFileStr += '\n};';

configFileStr += '\n\nexport const PagesComponents = {\n';

configFileStr += pagesImportsData.reduce((acc, current) => {
  const [ComponentName, , route] = current;
  return acc + `\t"${route}": ${ComponentName},\n`
}, '');

configFileStr += '\n};';
configFileStr += `
export type PagePaths = keyof typeof PagesComponents;

export const RoutesRegexp: [RegExp, PagePaths][] = Object.keys(
  PagesComponents
).map((current: PagePaths) => {
  return [getRegexpFromPath(current), current];
});
`;

const pageGenConfigFile = path.resolve(__dirname, '..', 'src', 'pages-config.gen.ts');
fs.writeFileSync(pageGenConfigFile, configFileStr);
console.log('🏗️  Generating the configuration for pages...');