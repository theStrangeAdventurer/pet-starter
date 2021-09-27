const ts = require("typescript");
const fs = require("fs");
const path = require('path');
const { ModuleResolutionKind, ModuleKind, ScriptTarget, JsxEmit } = ts;
const { preparePages } = require('./utils/prepare-pages');

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

const pages = preparePages(path.resolve(__dirname, '../src/pages'));

function compile() {
  const program = ts.createProgram(pages, tsConfig);
  program.emit();
}

console.log('🏗️  (ভ_ ভ) ރ ／/ ┊ \＼ Compiling pages for routing...');
compile();