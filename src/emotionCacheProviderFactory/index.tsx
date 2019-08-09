import * as React from "react";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";

/**
 * Factory function to create a component that you can wrap your application
 * with to specify where space kit's emotion classes will be added.
 *
 * This function is intenteded to be used like so:
 *
 * ```tsx
 * import { emotionCacheProviderFactory } from '@apollo/space-kit/emotionCacheProviderFactory`;
 *
 * const CacheProvider = emotionCacheProviderFactor(document.queryElement('head'));
 *
 * const App = (
 *   <CacheProvider>
 *     <AppCode />
 *   </Cache>
 * );
 *
 * @param container {HTMLElement} The container element that you want all your
 * emotion styles to be placed inside of
 */
export function emotionCacheProviderFactory(container?: HTMLElement | null) {
  // This expects us to have added `<style id="spaceKitEmotionStyleContainer"></style>`
  // somewhere to the DOM
  const emotionCache = createCache({
    // `createCache` expects `container` to be `HTMLElement | undefined`, but
    // `document.querySelector` returns `Element | null`; so we have to convert
    // the `null` to `undefined` here.
    container: container || undefined,
    key: "space-kit",
  });

  const EmotionCacheProvider: React.FC = ({ children }) => (
    <CacheProvider value={emotionCache}>{children}</CacheProvider>
  );

  return EmotionCacheProvider;
}
