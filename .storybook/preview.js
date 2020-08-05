import isChromatic from "storybook-chromatic/isChromatic";
import React from "react";
import { addDecorator } from "@storybook/react";
import { SpaceKitProvider } from "../src/SpaceKitProvider";

import "../reset.css";
import "../font.css";

addDecorator((story) => (
  <SpaceKitProvider disableAnimations={isChromatic()}>
    {story()}
  </SpaceKitProvider>
));
