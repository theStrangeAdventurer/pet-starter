const fs = require("fs");
const path = require("path");

const getPagesArr = (path) => fs.readdirSync(path).filter((page) => !/\.s?css$/.test(page))

module.exports = {
  preparePages: function preparePages(pagesPath) {
    let pages = getPagesArr(pagesPath);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const fullPath = path.resolve(pagesPath, page);
      const pageIsDir = fs.lstatSync(fullPath).isDirectory();
      if (pageIsDir) {
        const innerPages = getPagesArr(fullPath);
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
}