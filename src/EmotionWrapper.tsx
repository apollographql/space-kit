import React from "react";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";

// If there is an element with the `emotionStyleContainer` id, then use that to
// put your emotion styles in. We need this to allow emotion styles to be
// included before a bundle's css so we can override the styles with things like
// tailwind.
const emotionCache = createCache({
  container:
    document.querySelector<HTMLElement>("#emotionStyleContainer") || undefined,
});

/**
 * Wrapper for any component that uses emotion
 *
 * This will wrap the component in a `CacheProvider` and use that to inject
 * styles into #emotionStyleContainer. This is necessary to control the order of
 * your bundle's css and where emotion injects it's css.
 */
export const EmotionWrapper: React.FC = ({ children }) => {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};
