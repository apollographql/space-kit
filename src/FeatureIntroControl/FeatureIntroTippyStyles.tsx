import React from "react";
import { Global, css } from "@emotion/core";
import * as typography from "../typography";
import { colors } from "../colors";

export const FeatureIntroTippyStyles: React.FC = () => (
  <Global
    styles={css({
      ".tippy-box": {
        "&[data-theme=feature-intro]": {
          ...typography.base.small,
          backgroundColor: colors.white,
          filter: `drop-shadow(0px 4px 8px rgba(18, 21, 26, 0.16))`,

          '&[data-placement^="top"] > .tippy-arrow::before': {
            borderTopColor: colors.white,
          },
          '&[data-placement^="bottom"] > .tippy-arrow::before': {
            borderBottomColor: colors.white,
          },
          '&[data-placement^="right"] > .tippy-arrow::before': {
            borderRightColor: colors.white,
          },
          '&[data-placement^="left"] > .tippy-arrow::before': {
            borderLeftColor: colors.white,
          },

          //   ".tippy-content": {
          //     padding: "4px 8px",
          //   },
          "> .tippy-arrow::before": {
            transform: "scale(1.5)",
          },
        },
      },
    })}
  />
);
