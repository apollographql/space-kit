/* eslint-env node */
import typescript from "rollup-plugin-typescript2";
import multiInput from "rollup-plugin-multi-input";
import fs from "fs";
import path from "path";
import postcss from "rollup-plugin-postcss";

/**
 * Recursively read files from `rootPath`. `rootPath` and `options` are passed
 * through to `fs.readdir`. Has the same signature as `fs.readdirSync`.
 */
function recursiveReaddirSync(rootPath, options) {
  const files = fs
    .readdirSync(rootPath, options)
    .map((filename) => {
      const fullFilename = path.join(rootPath, filename);
      return fs.statSync(fullFilename).isDirectory()
        ? recursiveReaddirSync(fullFilename, options)
        : fullFilename;
    })
    .flat()
    .filter((filename) =>
      [".ts", ".tsx", ".js", ".jsx"].includes(path.extname(filename))
    )
    .map((filename) => path.relative(process.cwd(), filename));

  return files;
}

function CJS() {
  return {
    input: recursiveReaddirSync(path.resolve("src"))
      // Don't build tests or storybook stories
      .filter((filename) => !/\.(?:spec|story|stories)/.test(filename))
      // Exclude specific directories
      .filter(
        (filename) =>
          ![
            path.join("src", "icons", "scripts"),
            path.join("src", "illustrations", "scripts"),
            path.join("src", "pictograms", "scripts"),
            path.join("src", "shared"),
            path.join("src", "AbstractTooltip"),
            path.join("src", "ListConfig"),
          ].some((excludedPathname) => filename.includes(excludedPathname))
      ),
    external: [
      "@emotion/cache",
      "@emotion/core",
      "@tippyjs/react",
      "@popperjs/core",
      "@popperjs/core/lib/utils/computeAutoPlacement",
      "@popperjs/core/lib/utils/detectOverflow",
      "@popperjs/core/lib/utils/getOppositePlacement",
      "@popperjs/core/lib/utils/getOppositeVariationPlacement",
      "@react-aria/focus",
      "@react-aria/switch",
      "@react-aria/utils",
      "@react-aria/visually-hidden",
      "@react-stately/toggle",
      "classnames",
      "framer-motion",
      "prop-types",
      "react",
      "tinycolor2",
    ],
    output: [
      {
        dir: ".",
        format: "cjs",
        sourcemap: true,
        entryFileNames: "[name].js",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.build.json",
      }),
      multiInput({
        relative: "src/",
      }),
      postcss({
        extensions: [".css"],
      }),
    ],
  };
}

export default function () {
  return [CJS()];
}
