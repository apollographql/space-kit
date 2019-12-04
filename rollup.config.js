/* eslint-env node */
import typescript from "rollup-plugin-typescript2";
import multiInput from "rollup-plugin-multi-input";
import fs from "fs";
import path from "path";

function CJS() {
  return {
    input: [
      "src/Button",
      "src/Card",
      "src/colors",
      "src/emotionCacheProviderFactory",
      "src/fonts",
      "src/icons/*.tsx",
      "src/illustrations/*.tsx",
      "src/Loaders",
      "src/Modal",
      "src/SpaceKitProvider",
      "src/Table",
      "src/TextField",
      "src/typography",
      "src/typography/base.ts",
      "src/typography/mono.ts",
    ].map(filename => {
      if (filename.includes("*")) {
        return filename;
      }

      if (
        fs.existsSync(filename) &&
        fs.statSync(filename).isDirectory() === false
      ) {
        return filename;
      }

      if (fs.existsSync(path.join(filename, "index.tsx"))) {
        return path.join(filename, "/index.tsx");
      }

      if (fs.existsSync(path.join(filename, "/index.ts"))) {
        return path.join(filename, "/index.ts");
      }

      throw new Error(`could not resolve ${filename}`);
    }),
    external: [
      "@emotion/cache",
      "@emotion/core",
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
    ],
  };
}

export default function() {
  return [CJS()];
}
