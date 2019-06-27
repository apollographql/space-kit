import { configure } from "@storybook/react";

function importAll(r) {
  console.warn(r.keys());
  r.keys().forEach(r);
}

function loadStories() {
  importAll(
    require.context("../src", true, /\.(?:stories|story)\.(jsx?|tsx?)$/)
  );

  importAll(
    require.context("../stories", true, /\.(?:stories|story)\.(jsx?|tsx?)$/)
  );

  require("../reset.css");
  require("../font.css");
}

configure(loadStories, module);
