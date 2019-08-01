import * as React from "react";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";

// `createCache` expects `undefined` to use the `defaultContainer` and
// `querySelector` returns a nullable value; use `|| undefined` to use
// `undefined` if no element is found.
const emotionContainerElement: HTMLElement | undefined =
  document.querySelector<HTMLElement>("#spaceKitEmotionStyleContainer") ||
  undefined;

// This expects us to have added `<style id="spaceKitEmotionStyleContainer"></style>`
// somewhere to the DOM
const emotionCache = createCache({
  container: emotionContainerElement,
  key: "space-kit",
});

export const EmotionCacheProvider: React.FC = ({ children }) => (
  <CacheProvider value={emotionCache}>{children}</CacheProvider>
);
