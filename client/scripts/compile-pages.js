const ts = require("typescript");
const fs = require("fs");
const path = require('path');
const { ModuleResolutionKind, ModuleKind, ScriptTarget, JsxEmit } = ts;

const tsConfig = {
  moduleResolution: ModuleResolutionKind.NodeJs,
  module: ModuleKind.CommonJS,
  target: ScriptTarget.ES5,
  declaration: false,
  removeComments: true,
  emitDecoratorMetadata: false,
  experimentalDecorators: false,
  sourceMap: false,
  outDir: "../dist/pages",
  baseUrl: "../client",
  allowJs: false,
  skipLibCheck: true,
  jsx: JsxEmit.React,
  noEmitOnError: false,
}

function preparePages(pagesPath) {
  let pages = fs.readdirSync(pagesPath);
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const fullPath = path.resolve(pagesPath, page);
    const pageIsDir = fs.lstatSync(fullPath).isDirectory();
    if (pageIsDir) {
      const innerPages = fs.readdirSync(fullPath);
      delete pages[i];
      for (const innerPage of innerPages) {
        pages.push(`${page}/${innerPage}`);
      }
    }
  }
  return pages
    .filter(Boolean)
    .map((p) => `${pagesPath}/${p}`);
}

const pages = preparePages(path.resolve(__dirname, '../src/pages'));

function compile() {
  const program = ts.createProgram(pages, tsConfig);
  program.emit();
}

console.log('🏗️  (ভ_ ভ) ރ ／/ ┊ \＼ Compiling pages for routing...');
compile();