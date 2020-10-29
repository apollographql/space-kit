import * as types from "@babel/types";
import generate from "@babel/generator";
import fs from "fs";
import path from "path";
import { formatComponentName } from "./formatComponentName";
import { promisify } from "util";
import prettier from "prettier";

const readdirAsync = promisify(fs.readdir);
const SVG_PATH = path.resolve(__dirname, "..", "svgs");
const COMPONENT_PATH = path.resolve(__dirname, "..");

let mdx = `import { Canvas, Meta, Story } from "@storybook/addon-docs/blocks";\n`;
mdx += `import { IconDemo } from './icons.story/IconDemo';\n`;
(async () => {
  const categoryDirectories = (await readdirAsync(SVG_PATH)).filter(
    (dirname) => !dirname.startsWith(".")
  );

  const categorizedFilenames = categoryDirectories.reduce<
    Record<string, string[]>
  >((accumulator, categoryDirectory) => {
    const iconFilenames = fs
      .readdirSync(path.join(SVG_PATH, categoryDirectory))
      .filter((dirname) => !dirname.startsWith("."));
    accumulator[categoryDirectory] = iconFilenames;
    return accumulator;
  }, {});

  const importDeclarations: types.ImportDeclaration[] = Object.values(
    categorizedFilenames
  ).reduce<types.ImportDeclaration[]>((accumulator, filenames) => {
    const imports = filenames.map((filename) => {
      const componentName = formatComponentName(
        path.basename(filename, path.extname(filename))
      );
      return types.importDeclaration(
        [
          types.importSpecifier(
            types.identifier(componentName),
            types.identifier(componentName)
          ),
        ],
        types.stringLiteral(`./${componentName}`)
      );
    });
    return accumulator.concat(imports);
  }, []);
  importDeclarations.sort((a, b) => {
    return a.source.value.localeCompare(b.source.value);
  });

  mdx += generate(
    types.file(types.program(importDeclarations, [], "script"), null, null)
  ).code;

  mdx += "\n";
  mdx += "\n";

  mdx += `<Meta title="Components/Icons" />\n`;

  mdx += "\n";
  mdx += "# Icons\n";

  mdx += "## Customization\n";
  mdx +=
    'We set reasonable defaults for `fill` and `stroke` values. If you don\'t want these defaults, like you\'re using `className` to override these values, you can pass an empty string `""` as the values of the `fill` or `stroke` prop, like this: `fill=""` or `stroke=""` \n';

  mdx += "## Categories\n";

  Object.entries(categorizedFilenames).forEach(([category, filenames]) => {
    mdx += `### ${category.substr(0, 1).toUpperCase()}${category.substr(1)}\n`;

    mdx += `<Canvas mdxSource="${filenames
      .map((filename) =>
        formatComponentName(path.basename(filename, path.extname(filename)))
      )
      .map((componentName) => `<${componentName} />`)
      .join("\n")}">\n`;

    mdx += filenames
      .map((filename) =>
        formatComponentName(path.basename(filename, path.extname(filename)))
      )
      .map(
        (componentName) => `<Story name="${componentName}">
          <IconDemo name="${componentName}" Component={${componentName}} />
        </Story>`
      )
      .join("\n");
    mdx += "</Canvas>\n";
    mdx += "\n";
  });

  // const array = types.arrayExpression(
  //   Object.entries(categorizedFilenames).map(
  //     ([categoryDirectory, filenames]) => {
  //       return types.objectExpression([
  //         types.objectProperty(
  //           types.stringLiteral("category"),
  //           types.stringLiteral(categoryDirectory)
  //         ),

  //         types.objectProperty(
  //           types.stringLiteral("components"),
  //           types.objectExpression(
  //             filenames.map((filename) => {
  //               const componentName = formatComponentName(
  //                 path.basename(filename, path.extname(filename))
  //               );

  //               return types.objectProperty(
  //                 types.identifier(componentName),
  //                 types.objectExpression([
  //                   types.objectProperty(
  //                     types.stringLiteral("Component"),
  //                     types.identifier(componentName)
  //                   ),
  //                   types.objectProperty(
  //                     types.stringLiteral("isStreamline"),
  //                     types.booleanLiteral(filename.endsWith("-sl.svg"))
  //                   ),
  //                 ]),
  //                 false,
  //                 true
  //               );
  //             })
  //           )
  //         ),
  //       ]);
  //     }
  //   )
  // );

  // // const declarator = types.variableDeclarator(types.identifier("icons"), array);

  // const file = types.file(
  //   types.program(
  //     [
  //       ...importDeclarations,
  //       types.exportNamedDeclaration(
  //         types.variableDeclaration("const", [
  //           types.variableDeclarator(types.identifier("icons"), array),
  //         ]),
  //         []
  //       ),
  //     ],
  //     [],
  //     "script"
  //   ),
  //   null,
  //   null
  // );

  // eslint-disable-next-line no-console
  console.log(
    prettier.format(mdx, {
      ...(await prettier.resolveConfig(COMPONENT_PATH)),
      parser: "mdx",
    })
  );
})();
