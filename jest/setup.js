/* eslint-disable @typescript-eslint/no-empty-function */

// We need to polyfill `createRange` to make JSDOM compatible with Popper. See
// this thread https://github.com/popperjs/popper-core/issues/478 and this
// example of how tippy is polyfilling
// https://github.com/atomiks/tippy.js-react/blob/master/test/setup.js

// eslint-disable-next-line no-undef
global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 };
    },
    getClientRects: () => [],
    commonAncestorContainer: document.createElement("div"),
  };
};
