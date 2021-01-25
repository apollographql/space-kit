import "../../../node_modules/tippy.js/dist/tippy.css";
import React from "react";
import { base } from "../../typography";
import { colors } from "../../colors";
import { Global, css } from "@emotion/core";

export const TippyStyles: React.FC = () => (
  <Global
    styles={css({
      ".tippy-box": {
        // We need this to anticipate sub-pixel shifting between the animated
        // and non-animated state.
        "will-change": "transform",

        "&[data-theme=space-kit]": {
          ...base.small,
          backgroundColor: colors.black.base,
          opacity: 0.95,

          '&[data-placement^="top"] > .tippy-arrow': {
            borderTopColor: colors.black.base,
          },
          '&[data-placement^="bottom"] > .tippy-arrow': {
            borderBottomColor: colors.black.base,
          },
          '&[data-placement^="right"] > .tippy-arrow': {
            borderRightColor: colors.black.base,
          },
          '&[data-placement^="left"] > .tippy-arrow': {
            borderLeftColor: colors.black.base,
          },

          ".tippy-content": {
            padding: "4px 8px",
          },

          "&.space-kit-relaxed .tippy-content": {
            padding: "8px 12px",
          },
        },
      },
    })}
  />
);
