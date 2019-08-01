import fs from "fs";
import path from "path";
import update from "immutability-helper";
import svgr from "@svgr/core";
import { formatComponentName } from "./formatComponentName";
import { svgo } from "./convertUtils/setupSvgo";
import { JSXElement } from "@babel/types";

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
              path: path.join(fullSvgDirectory, filename),
            });

            const componentName = formatComponentName(
              path.basename(filename, path.extname(filename))
            );

            function makeClassName() {
              const css =
                "*{vector-effect: non-scaling-stroke} overflow: visible";

              return {
                type: "JSXAttribute",
                name: {
                  type: "JSXIdentifier",
                  name: "css",
                },
                value: {
                  type: "JSXExpressionContainer",
                  expression: {
                    type: "TaggedTemplateExpression",
                    tag: {
                      type: "Identifier",
                      name: "css",
                    },
                    quasi: {
                      type: "TemplateLiteral",
                      expressions: [],
                      quasis: [
                        {
                          type: "TemplateElement",
                          tail: true,
                          value: {
                            raw: css,
                            cooked: css,
                          },
                        },
                      ],
                    },
                  },
                },
              };
            }

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
                    plugins: ["typescript"],
                  });

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
                    weight?: "normal" | "heavy";
                  }

                  export const ${componentName} = ({ weight = "normal", ...props }: Props) => ${update(
                    jsx as JSXElement,
                    {
                      children: {
                        $apply: (children: JSXElement["children"]) =>
                          children.map(child =>
                            update(child, {
                              openingElement: {
                                attributes: {
                                  $apply: (
                                    attributes: JSXElement["openingElement"]["attributes"]
                                  ) =>
                                    attributes.map(attribute => {
                                      if (
                                        attribute.type === "JSXAttribute" &&
                                        attribute.name.name === "strokeWidth" &&
                                        typeof attribute.value === "object" &&
                                        attribute.value != null &&
                                        attribute.value.type ===
                                          "JSXExpressionContainer" &&
                                        attribute.value.expression.type ===
                                          "NumericLiteral"
                                      ) {
                                        return update(attribute, {
                                          value: {
                                            $set: {
                                              type: "JSXExpressionContainer",
                                              expression: {
                                                type: "ConditionalExpression",
                                                test: {
                                                  type: "BinaryExpression",
                                                  left: {
                                                    type: "Identifier",
                                                    name: "weight",
                                                  },
                                                  operator: "===",
                                                  right: {
                                                    type: "StringLiteral",
                                                    value: "normal",
                                                  },
                                                },
                                                consequent: {
                                                  type: "NumericLiteral",
                                                  value: 1.5,
                                                },
                                                alternate: {
                                                  type: "NumericLiteral",
                                                  value: 2,
                                                },
                                              },
                                            },
                                          },
                                        } as any);
                                      }

                                      return attribute;
                                    }),
                                },
                              },
                            })
                          ),
                      },
                      openingElement: {
                        attributes: {
                          $push: [makeClassName() as any],
                        },
                      },
                    }
                  )};
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
