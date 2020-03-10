import { ClassNames } from "@emotion/core";
import React from "react";
import { Button } from "../Button";
import { colors } from "../../colors";

interface Props {
  theme: NonNullable<React.ComponentProps<typeof Button>["theme"]>;
}

export const ButtonLayout: React.FC<Props> = ({ children, theme }) => (
  <ClassNames>
    {({ css, cx }) => (
      <div
        className={cx(
          css({
            backgroundColor:
              theme === "light" ? colors.white : colors.black.base,
            border: "solid 1px #dee2e7",
            borderRadius: 8,
            display: "inline-flex",
            flexDirection: "column",

            "> *": {
              margin: 8,
              display: "flex",
            },
          })
        )}
      >
        {children}
      </div>
    )}
  </ClassNames>
);
