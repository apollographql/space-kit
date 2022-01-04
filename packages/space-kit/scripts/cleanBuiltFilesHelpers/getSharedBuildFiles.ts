/**
 * Get a list of files with the `${name}-abc12345.js.map` pattern from a list of
 * files
 */
export function getSharedBuildFiles(
  /** List of files relative to a target directory, no slashes */
  fileList: ReadonlyArray<string>
): string[] {
  /**
   * List of `.js.map` files
   */
  const mapFiles = fileList.filter(file => /\.js\.map$/.test(file));
  const javascriptFiles = mapFiles
    .map(filename => filename.replace(/\.map$/, ""))
    .filter(filename => {
      return fileList.includes(filename);
    });

  /** Save the result so it can be sorted */
  const result = [
    ...javascriptFiles,
    ...javascriptFiles.map(filename => `${filename}.map`),
  ];
  result.sort();
  return result;
}
