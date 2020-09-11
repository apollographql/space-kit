import isChromatic from "chromatic/isChromatic";
import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { SpaceKitProvider } from "../src/SpaceKitProvider";
import { ThemedCanvas } from "./preview/ThemedCanvas";

import "../reset.css";
import "../font.css";

addDecorator((story) => (
  <SpaceKitProvider disableAnimations={isChromatic()}>
    {story()}
  </SpaceKitProvider>
));

addParameters({
  docs: {
    components: {
      Canvas: ThemedCanvas,
    },
  },
});
