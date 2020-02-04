import "../../../node_modules/tippy.js/dist/tippy.css";
import React from "react";
import { base } from "../../typography";
import { colors } from "../../colors";
import { Global, css } from "@emotion/core";

export const TippyMenuStyles: React.FC = () => (
  <Global
    styles={css({
      ".tippy-tooltip": {
        "&.space-kit-menu-theme": {
          ...base.small,
          backgroundColor: colors.white,
          borderRadius: 4,
          boxShadow:
            "0 3px 4px 0 rgba(18, 21, 26, 0.04), 0 4px 8px 0 rgba(18, 21, 26, 0.08), 0 0 0 1px rgba(18, 21, 26, 0.08)",
          color: colors.black.base,
          padding: 8,
          minWidth: 190,

          ".tippy-content": {
            padding: "0",
            overflowY: "auto",
          },
        },
      },
    })}
  />
);
