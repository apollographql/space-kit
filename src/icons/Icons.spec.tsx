import React from "react";
import { cleanup, render } from "@testing-library/react";
import fs from "fs";
import path from "path";
import faker from "faker";

afterEach(cleanup);

/**
 * Retrieve a list of absolute filenames to all icon component files
 */
function getComponentFiles(): ReadonlyArray<string> {
  return fs
    .readdirSync(path.resolve(__dirname))
    .map(filename => path.join(__dirname, filename))
    .filter(filename => fs.statSync(filename).isFile())
    .filter(filename => !filename.match(/(story|spec)/))
    .filter(filename => path.extname(filename) === ".tsx");
}

test("should have icons already built", () => {
  expect(getComponentFiles()).not.toHaveLength(0);
});

describe("all icons should passthrough refs", () => {
  /**
   * List of absolute filenames containing components to test
   */
  const componentFiles = getComponentFiles();

  componentFiles.map(componentFile => {
    test(path.relative(".", componentFile), async () => {
      /**
       * Ref to send to the component
       *
       * Used to compare that the ref is passed to the top level element in the
       * component
       */

      const ref = React.createRef<Element>();
      /**
       * Randomly generated test id
       */
      const testId = faker.lorem.word();

      /**
       * Component name to test
       *
       * The exported component's name should be the same as the filename after
       * removing the extension
       */
      const componentName = path.basename(
        componentFile,
        path.extname(componentFile)
      );

      /**
       * Component to test
       *
       * Imported using a dyanamic `import`
       */
      const Component = (await import(componentFile))[componentName];

      const { getByTestId } = render(
        <Component ref={ref} data-testid={testId} />
      );

      expect(ref.current).toBe(getByTestId(testId));
    });
  });
});
