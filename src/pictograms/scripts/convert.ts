import fs from "fs";
import path from "path";
import svgr from "@svgr/core";
import { formatComponentName } from "./formatComponentName";
import { svgo } from "./convertUtils/setupSvgo";
import * as types from "@babel/types";
import traverse from "@babel/traverse";
import { colors } from "../../colors";
import prettier from "prettier";

const SVG_PATH = path.resolve(__dirname, "..", "svgs");
const COMPONENT_PATH = path.resolve(__dirname, "..");

function addDimensions(node: types.JSXOpeningElement) {
  if (node.name.type !== "JSXIdentifier" || node.name.name !== "svg") {
    return;
  }

  const viewBoxAttribute = node.attributes.find(
    (attribute) =>
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

  const [, , width, height] = viewBoxAttribute.value.value.split(/\s+/);

  node.attributes.push(
    types.jsxAttribute(
      types.jsxIdentifier("css"),
      types.jsxExpressionContainer(
        types.objectExpression([
          types.objectProperty(
            types.stringLiteral("color"),
            types.stringLiteral(colors.silver.light)
          ),
          types.objectProperty(
            types.stringLiteral("height"),
            types.stringLiteral(`${height}px`)
          ),
          types.objectProperty(
            types.stringLiteral("width"),
            types.stringLiteral(`${width}px`)
          ),
        ])
      )
    )
  );
}

function generateStorybookStory(componentNames: string[]) {
  const content = `${componentNames
    .map(
      (componentName) =>
        `import { ${componentName} } from "./${componentName}";`
    )
    .join("\n")}
import { colors } from "../colors";
import { Meta, Story, Props, Canvas } from "@storybook/addon-docs/blocks";

<Meta title="www/Pictograms" />

# Pictograms

Pictograms are custom Apollo graphics/icons, they will always be Indigo, and will only be used as they are displayed below.

## Variants

${componentNames
      .map(
        (componentName) =>
          `## ${componentName}

<Canvas>
  <Story name="${componentName}">
    <${componentName} width={180} />
  </Story>
</Canvas>
`
      )
      .join("\n")}

## Props

All pictogram components extends \`SVGSVGElement\` so that most props you'd want to pass to any element can be passed to this component.

<Props of={${componentNames[0]}} />
`;

  fs.writeFileSync(
    path.join(COMPONENT_PATH, "Pictograms.story.mdx"),
    content,
    "utf-8"
  );
}

(async () => {
  if (!fs.existsSync(COMPONENT_PATH)) {
    fs.mkdirSync(COMPONENT_PATH);
  }

  const prettierConfig = await prettier.resolveConfig(COMPONENT_PATH);

  generateStorybookStory(
    fs
      .readdirSync(SVG_PATH)
      .filter((filename) => path.extname(filename) === ".svg")
      .map((filename) => {
        return formatComponentName(
          path.basename(filename, path.extname(filename))
        );
      })
  );

  fs.readdirSync(SVG_PATH)
    .filter((filename) => path.extname(filename) === ".svg")
    .map(async (filename) => {
      const svgCode = fs.readFileSync(path.join(SVG_PATH, filename), "utf-8");

      // We have to use a custom svgo setup because the `svgr` one isn't
      // configurable and will sometimes remove fills and strokes that we
      // don't want removed.
      const { data: svg } = await svgo.optimize(svgCode, {
        path: path.join(SVG_PATH, filename),
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
            }: { imports: any; componentName: string; jsx: types.JSXElement }
          ) {
            const typeScriptTpl = template.smart({
              plugins: ["typescript"],
            });

            jsx.openingElement.attributes.push(
              types.jsxAttribute(
                types.jsxIdentifier("ref"),
                types.jsxExpressionContainer(types.identifier("ref"))
              )
            );

            traverse(jsx, {
              noScope: true,
              JSXOpeningElement({ node }) {
                addDimensions(node);
              },
            });

            return typeScriptTpl.ast`
              ${imports}
              import { jsx } from '@emotion/core';

              export const ${componentName} = React.forwardRef<SVGSVGElement, Omit<React.SVGProps<SVGSVGElement>, "css">>(
                (props, ref) => ${jsx}
              )
            `;
          },
          plugins: ["@svgr/plugin-jsx"],
        },
        { componentName }
      );

      const outputFilename = path.join(COMPONENT_PATH, `${componentName}.tsx`);

      // This is hacky because I haven't figured out how to make `svgr`'s
      // template function retain comments.
      fs.writeFileSync(
        outputFilename,
        prettier.format(`/** @jsx jsx */\n${componentSource}`, {
          ...prettierConfig,
          parser: "typescript",
        }),
        "utf-8"
      );
    });
})();
