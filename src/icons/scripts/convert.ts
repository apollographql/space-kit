import * as types from "@babel/types";
import fs from "fs";
import path from "path";
import svgr from "@svgr/core";
import { formatComponentName } from "./formatComponentName";
import { svgo } from "./convertUtils/setupSvgo";
import traverse from "@babel/traverse";

const SVG_PATH = path.resolve(__dirname, "..", "svgs");
const COMPONENT_PATH = path.resolve(__dirname, "..");

/**
 * Get the height from the `viewbox` attribute of a `JSXOpeningElement` node
 * @param node Node to get the `viewbox` from
 */
function getHeightFromViewbox(node: types.JSXOpeningElement) {
  const viewBoxAttribute = node.attributes.find(
    attribute =>
      attribute.type === "JSXAttribute" &&
      attribute.name.type === "JSXIdentifier" &&
      attribute.name.name === "viewBox"
  );

  if (
    !viewBoxAttribute ||
    viewBoxAttribute.type !== "JSXAttribute" ||
    !viewBoxAttribute.value ||
    viewBoxAttribute.value.type !== "StringLiteral"
  ) {
    return;
  }

  const [, , , height] = viewBoxAttribute.value.value.split(/\s+/);

  return height;
}

function updateStrokeWidths(node: types.JSXOpeningElement) {
  node.attributes.forEach(attribute => {
    if (
      attribute.type === "JSXAttribute" &&
      attribute.name.type === "JSXIdentifier" &&
      attribute.name.name === "strokeWidth" &&
      attribute.value &&
      attribute.value.type === "JSXExpressionContainer"
    ) {
      attribute.value = types.jsxExpressionContainer(
        types.conditionalExpression(
          types.binaryExpression(
            "===",
            types.identifier("weight"),
            types.stringLiteral("normal")
          ),
          types.numericLiteral(1.5),
          types.numericLiteral(1)
        )
      );
    }
  });
}

function createCSSAttribute(css: string): types.JSXAttribute {
  return types.jsxAttribute(
    types.jsxIdentifier("css"),
    types.jsxExpressionContainer(
      types.taggedTemplateExpression(
        types.identifier("css"),
        types.templateLiteral(
          [
            types.templateElement(
              {
                raw: css,
                cooked: css,
              },
              true
            ),
          ],
          []
        )
      )
    )
  );
}

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
              path: path.join(fullSvgDirectory, filename),
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
                  {
                    imports,
                    componentName,
                    jsx,
                  }: {
                    imports: any;
                    componentName: string;
                    jsx: types.JSXElement;
                  }
                ) {
                  const typeScriptTpl = template.smart({
                    plugins: ["typescript"],
                  });

                  traverse(jsx, {
                    noScope: true,
                    JSXOpeningElement({ node }) {
                      updateStrokeWidths(node);
                    },
                  });

                  // Add css template literal
                  jsx.openingElement.attributes.push(
                    createCSSAttribute(
                      `*{vector-effect: non-scaling-stroke}
                      overflow: visible;
                      height: ${getHeightFromViewbox(jsx.openingElement)}px;`
                    )
                  );
                  // We need to add '/** @jsx jsx */' to the top of the file,
                  // but this implementation will strip it out. We add it
                  // manually when we write the file to disk.
                  return typeScriptTpl.ast`
                  /** @jsx jsx */ /* <- this is stripped out by svgr :( so we manually add it when we write to disk */
                  ${imports}
                  import { css, jsx } from '@emotion/core';
                  
                  interface Props extends React.SVGProps<SVGSVGElement> {
                    /**
                     * Weight to render the SVG in. Defaults to "normal"
                     */
                    weight?: "thin" | "normal";
                  }

                  export const ${componentName} = ({ weight = "normal", ...props }: Props) => ${jsx}
                `;
                },
                plugins: ["@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                replaceAttrValues: {
                  "#000": "currentColor",
                  "#000000": "currentColor",
                  // Color used by GitHub icon 🤷‍♀️
                  "#12151A": "currentColor",
                },
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

            // This is hacky because I haven't figured out how to make `svgr`'s
            // template function retain comments.
            fs.writeFileSync(
              outputFilename,
              `/** @jsx jsx */\n${componentSource}`,
              "utf-8"
            );
          })
      );
    });
})();
