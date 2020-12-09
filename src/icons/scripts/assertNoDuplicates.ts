import fs from "fs";
import path from "path";
import { formatComponentName } from "./formatComponentName";

/** Wrap `path.basename` and automatically include `path.extname` so we get the
 * basename minus the extension */
function basenameWithoutExtension(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

const SVG_PATH = path.resolve(__dirname, "..", "svgs");

const streamlineDuplicates: Array<[string, string]> = [];
const otherCategoryDuplicates: Array<[string, string]> = [];

const categorizedFilenames = fs
  .readdirSync(SVG_PATH)
  .filter((dirname) => !dirname.startsWith("."))
  .reduce<Array<{ filename: string; componentName: string }>>(
    (accumulator, categoryDirectory) => {
      const iconFilenames = fs
        .readdirSync(path.join(SVG_PATH, categoryDirectory))
        .filter((dirname) => !dirname.startsWith("."));
      return accumulator.concat(
        iconFilenames.map((filename) => ({
          filename: path.join(categoryDirectory, filename),
          componentName: formatComponentName(
            basenameWithoutExtension(filename),
          ),
        })),
      );
    },
    [],
  );

categorizedFilenames.forEach(({ filename, componentName }, index, list) => {
  const duplicate = list
    .slice(index + 1)
    .find((item) => item.componentName === componentName);

  if (duplicate) {
    if (
      basenameWithoutExtension(filename).endsWith("-sl") !==
      basenameWithoutExtension(duplicate.filename).endsWith("-sl")
    ) {
      streamlineDuplicates.push([filename, duplicate.filename]);
    } else {
      otherCategoryDuplicates.push([filename, duplicate.filename]);
    }
  }
});

function getRelativeDirectoryName(svgRelativePath: string): string {
  return path.relative(process.cwd(), path.join(SVG_PATH, svgRelativePath));
}

if (streamlineDuplicates.length) {
  // eslint-disable-next-line no-console
  console.log(
    "The following icons have both streamline and non-streamline icon files. This will cause one of the icons to be overwritten because the `-sl` is stripped from the resulting component filename. Please delete or rename one file from each of these pairs:\n",
  );
  // eslint-disable-next-line no-console
  console.log(
    streamlineDuplicates
      .map(([a, b]) =>
        [
          `${formatComponentName(basenameWithoutExtension(a))}:`,
          `* ${getRelativeDirectoryName(a)}`,
          `* ${getRelativeDirectoryName(b)}`,
        ].join("\n"),
      )
      .join("\n\n"),
  );
}

if (otherCategoryDuplicates.length && otherCategoryDuplicates.length) {
  // eslint-disable-next-line no-console
  console.log("");
}

if (otherCategoryDuplicates.length) {
  // eslint-disable-next-line no-console
  console.log(
    "The following icons exist under different categories. We write all components to a single directory, so this will cause one of these icons to be overwritten. Please delete or rename one file from each of these pairs:\n",
  );

  // eslint-disable-next-line no-console
  console.log(
    otherCategoryDuplicates
      .map(([a, b]) =>
        [
          `${formatComponentName(basenameWithoutExtension(a))}:`,
          `* ${getRelativeDirectoryName(a)}`,
          `* ${getRelativeDirectoryName(b)}`,
        ].join("\n"),
      )
      .join("\n\n"),
  );
}

if (streamlineDuplicates.length || otherCategoryDuplicates.length) {
  process.exit(1);
}
