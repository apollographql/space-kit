import { getSharedBuildFiles } from "./getSharedBuildFiles";

test("should get correct files", () => {
  expect(
    getSharedBuildFiles([
      "TippyStyles-61d35445.js",
      "TippyStyles-61d35445.js.map",
      "__mocks__",
      "_tslib-bcbe0269.js",
      "mono-554aa491.js",
      "mono-801ff217.js.map",
    ])
  ).toMatchInlineSnapshot(`
    Array [
      "TippyStyles-61d35445.js",
      "TippyStyles-61d35445.js.map",
    ]
  `);
});
