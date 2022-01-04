import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import { promisify } from "util";
import { getSharedBuildFiles } from "./cleanBuiltFilesHelpers/getSharedBuildFiles";

const rimrafAsync = promisify(rimraf);

(async () => {
  /**
   * Where the source files live
   */
  const sourceBase = path.resolve("./src");

  /**
   * Where the build files live
   */
  const builtBase = path.resolve(".");

  /**
   * List of directories inside of `sourceBase`, excluding the base directory
   */
  const sourceDirectoryNames = fs
    .readdirSync(sourceBase)
    .filter(filename =>
      fs.statSync(path.join(sourceBase, filename)).isDirectory()
    );

  await Promise.all(
    sourceDirectoryNames.map(async sourceDirectory => {
      const completeCompiledDirectory = path.join(builtBase, sourceDirectory);
      await rimrafAsync(completeCompiledDirectory);
    })
  );

  await Promise.all(
    getSharedBuildFiles(fs.readdirSync(builtBase)).map(async filename => {
      const completeCompiledFilename = path.join(builtBase, filename);
      await rimrafAsync(completeCompiledFilename);
    })
  );
})();
