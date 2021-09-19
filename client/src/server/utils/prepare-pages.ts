import path from "path";
import fs from "fs";

export function preparePages(pagesPath: string) {
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
  return pages.filter(Boolean).map((p) => p.replace(".tsx", ""));
}
