import fs from "fs";
import path from "path";
import svgr from "@svgr/core";
import { formatComponentName } from "./formatComponentName";
import { svgo } from "./convertUtils/setupSvgo";

const SVG_PATH = path.resolve(__dirname, "..", "svgs");
const COMPONENT_PATH = path.resolve(__dirname, "..", "..", "..", "icons");

(async () => {
  if (!fs.existsSync(COMPONENT_PATH)) {
    fs.mkdirSync(COMPONENT_PATH);
  }

  // Move all the files in corresponding component directories
  return fs
    .readdirSync(SVG_PATH)
    .filter(svgPathFilename =>
      fs.lstatSync(path.join(SVG_PATH, svgPathFilename)).isDirectory()
    )
    .map(async svgPathDirectory => {
      const fullSvgDirectory = path.join(SVG_PATH, svgPathDirectory);

      return Promise.all(
        fs
          .readdirSync(fullSvgDirectory)
          .filter(filename => path.extname(filename) === ".svg")
          .map(async filename => {
            const svgCode = fs.readFileSync(
              path.join(fullSvgDirectory, filename),
              "utf-8"
            );

            // We have to use a custom svgo setup because the `svgr` one isn't
            // configurable and will sometimes remove fills and strokes that we
            // don't want removed.
            const { data: svg } = await svgo.optimize(svgCode, {
              path: path.join(fullSvgDirectory, filename)
            });

            const componentName = formatComponentName(
              path.basename(filename, path.extname(filename))
            );

            const componentSource = await svgr(
              svg,
              {
                dimensions: false,
                template: function svgrTemplate(
                  { template },
                  _opts,
                  { imports, componentName, jsx }
                ) {
                  const typeScriptTpl = template.smart({
                    plugins: ["typescript"]
                  });

                  return typeScriptTpl.ast`
                  ${imports}
                  export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
                `;
                },
                plugins: ["@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                replaceAttrValues: {
                  "#000": "currentColor",
                  "#000000": "currentColor",
                  // Color used by GitHub icon 🤷‍♀️
                  "#12151A": "currentColor"
                }
              },
              { componentName }
            );

            // console.log(
            //   path.relative(
            //     process.cwd(),
            //     path.join(path.join(COMPONENT_PATH, `${componentName}.tsx`))
            //   )
            // );

            const outputFilename = path.join(
              COMPONENT_PATH,
              `${componentName}.tsx`
            );

            fs.writeFileSync(outputFilename, componentSource, "utf-8");
          })
      );
    });
})();
