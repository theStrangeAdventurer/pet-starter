export const prepareAssetsHtml = (
  assetsManifest: { [asset: string]: string },
  publicFolder = "/public"
) => {
  const jsFiles = Object.keys(assetsManifest).filter(
    (f) => !/(\.map|\.css)/g.test(f)
  );
  const cssFiles = Object.keys(assetsManifest).filter(
    (f) => !/(\.map|\.js)/g.test(f)
  );

  const jsScriptsHtml = jsFiles
    .map(
      (script) =>
        `<script class="react-script" defer="defer" src="${publicFolder}/${script}"></script>`
    )
    .join("\n");
  const cssLinkshtml = cssFiles
    .map((link) => `<link rel="stylesheet" href="${publicFolder}/${link}">`)
    .join("\n");

  return {
    jsScriptsHtml,
    cssLinkshtml,
  };
};
