import "../reset.css";
import "../font.css";

import { configure } from "@storybook/react";

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
