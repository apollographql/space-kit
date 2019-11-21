import isChromatic from "storybook-chromatic/isChromatic";
import React from "react";
import { addDecorator, configure } from "@storybook/react";
import { SpaceKitProvider } from "../src/SpaceKitProvider";

import "../reset.css";
import "../font.css";

addDecorator(story => (
  <SpaceKitProvider disableAnimations={isChromatic()}>
    {story()}
  </SpaceKitProvider>
));

configure(
  [
    require.context("../src", true, /\.(?:stories|story)\.(jsx?|tsx?|mdx)$/),
    require.context(
      "../stories",
      true,
      /\.(?:stories|story)\.(jsx?|tsx?|mdx)$/
    ),
  ],
  module
);
