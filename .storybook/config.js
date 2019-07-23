import { configure } from "@storybook/react";

function importAll(r) {
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
